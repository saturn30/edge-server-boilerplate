# edge-server-boilerplate

환경 구성

./.dev.vars

```
DB_AUTH_TOKEN=ey...
```

개발용 시크릿 저장, 프로덕션은 클라우드플레어 대시보드에서 직접 설정

./wrangler.toml

```
name = "edge-server-boilerplate"
compatibility_date = "2023-01-01"

[env.dev.vars]
DATABASE_URL = "libsql://url"

[env.production.vars]
```
