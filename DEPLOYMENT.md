# Deploying to AWS Lightsail

The site runs as a Next.js standalone server in Docker, behind Caddy for TLS.
Two containers, one instance, no external build service.

---

## 1. Create the instance

Lightsail → Create instance:

| Setting  | Value                                                       |
| -------- | ----------------------------------------------------------- |
| Platform | Linux/Unix                                                  |
| Blueprint| **OS Only → Ubuntu 24.04 LTS**                              |
| Plan     | **2 GB RAM / 2 vCPU** minimum                               |

> The 512MB and 1GB plans will OOM during `next build`. If you must use one,
> build the image elsewhere and push it to a registry rather than building on
> the instance — see [Building off-instance](#building-off-instance).

Attach a **static IP** (Networking → Create static IP → attach). Without this,
the address changes on every stop/start and DNS breaks.

Open ports in Networking → IPv4 Firewall:

| Application | Protocol | Port |
| ----------- | -------- | ---- |
| HTTP        | TCP      | 80   |
| HTTPS       | TCP      | 443  |
| Custom      | UDP      | 443  |

Port 443/UDP is for HTTP/3. Leave SSH (22) restricted to your own IP.

---

## 2. Point DNS at it

In your DNS provider (Cloudflare today):

```
A     en2.tech        <static-ip>
A     www.en2.tech    <static-ip>
```

**If you keep Cloudflare:** set both records to **DNS only** (grey cloud) for
the first deploy. Caddy needs to complete an HTTP-01 challenge directly, and
Cloudflare's proxy in front of it will fail the challenge. Once a certificate
is issued you can switch the proxy back on — but if you do, set Cloudflare's
SSL mode to **Full (strict)**, never Flexible.

Confirm propagation before continuing:

```bash
dig +short en2.tech
```

---

## 3. Install Docker on the instance

```bash
ssh ubuntu@<static-ip>

sudo apt-get update && sudo apt-get upgrade -y
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker ubuntu
newgrp docker            # or log out and back in

docker --version && docker compose version
```

---

## 4. Add swap

A 2GB instance will run out of memory during `next build` without it. This is
the single most common cause of a failed first deploy.

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
free -h
```

---

## 5. Deploy

```bash
git clone <your-repo-url> en2tech
cd en2tech

cp .env.example .env
nano .env          # fill in RESEND_API_KEY, ACME_EMAIL, SITE_DOMAIN

docker compose up -d --build
docker compose logs -f
```

First build takes 3–6 minutes. Caddy requests a certificate as soon as it
starts; watch for `certificate obtained successfully` in the logs.

Verify:

```bash
curl -I https://en2.tech
curl -s https://en2.tech/robots.txt
```

---

## 6. Configure email

The contact form logs submissions to stdout until Resend is configured, and
its response says so explicitly — it never claims to have sent mail it didn't.

1. Create an account at [resend.com](https://resend.com)
2. Add and verify the **en2.tech** domain (adds SPF/DKIM records to DNS)
3. Create an API key
4. Put it in `.env` as `RESEND_API_KEY`
5. `docker compose up -d` to restart with the new value

**Why not SMTP:** AWS blocks outbound port 25 on Lightsail by default, and a
fresh Lightsail IP has no sending reputation — mail sent from it lands in spam
even after the block is lifted. An HTTPS email API avoids both problems.

---

## Updating the site

```bash
cd ~/en2tech
git pull
docker compose up -d --build
docker image prune -f      # reclaim disk from the old image
```

Zero-downtime is not configured — expect a few seconds of 502 during the
swap. For a marketing site that is an acceptable trade for the simplicity.

---

## Building off-instance

If you are on a 1GB plan or want faster deploys, build the image on your
machine (or in CI) and push it:

```bash
# locally
docker build -t <registry>/en2tech:latest .
docker push <registry>/en2tech:latest
```

Then on the instance, replace the `build:` block in `docker-compose.yml`
with `image: <registry>/en2tech:latest` and run `docker compose pull &&
docker compose up -d`.

---

## Operations

**Logs**

```bash
docker compose logs -f web        # application
docker compose logs -f caddy      # TLS + access
```

**Health**

The `web` container has a healthcheck. `docker compose ps` shows its status;
an unhealthy container is restarted by the `unless-stopped` policy.

**Certificates**

Renewal is automatic. Certificates live in the `caddy_data` volume — **do not
delete that volume**, or you will re-request certificates and can hit Let's
Encrypt's rate limit (5 duplicate certificates per week).

**Backups**

Enable automatic snapshots in Lightsail (Snapshots → Enable automatic
snapshots). There is no database; the only state on the instance is the Caddy
certificate volume and your `.env`.

---

## Environment variables

| Variable               | Required | Notes                                                        |
| ---------------------- | -------- | ------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | yes      | **Build-time.** Canonical URLs, sitemap, JSON-LD.            |
| `SITE_DOMAIN`          | yes      | Caddy's TLS hostname.                                        |
| `ACME_EMAIL`           | yes      | Let's Encrypt expiry notices.                                |
| `RESEND_API_KEY`       | no*      | Without it, submissions are logged rather than emailed.      |
| `CONTACT_TO_EMAIL`     | no       | Defaults to the address in `src/lib/site.ts`.                |
| `CONTACT_FROM_EMAIL`   | no       | Must be a Resend-verified domain.                            |
| `TRUST_PROXY_HEADERS`  | yes      | `"true"` behind the proxy. Unset → one shared rate bucket.   |

\* Not required to boot, but the form cannot deliver mail without it.

---

## Troubleshooting

**Caddy won't get a certificate**
Cloudflare proxy is on (grey-cloud it), or ports 80/443 aren't open in the
Lightsail firewall, or DNS hasn't propagated. Check `docker compose logs caddy`.

**Build killed / exit code 137**
Out of memory. Add swap (step 4) or build off-instance.

**Contact form returns "email delivery is not configured"**
`RESEND_API_KEY` is empty. This is the intended message, not a bug.

**Everyone gets rate-limited after five submissions**
`TRUST_PROXY_HEADERS` isn't `"true"`. The app logs a warning about this on
first request in production.

**502 from Caddy**
The web container is down or still starting. `docker compose ps` and
`docker compose logs web`.
