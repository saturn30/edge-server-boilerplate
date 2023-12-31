# edge-server-boilerplate

## todo

- [ ] lucia 인증 모듈 추가 (https://lucia-auth.com/)
- [ ] turso 로컬 개발 환경 구성
- [ ] validator 추가
- [ ] 테스트 추가

## 스택

- 서버 - hono(cf-workers)
- db - turso (d1 출시 후 변경 예정)
- orm - drizzle

## 환경 설정

환경 구성

```
# .dev.vars
DB_AUTH_TOKEN=ey...
```

개발용 시크릿 저장, 프로덕션은 클라우드플레어 대시보드에서 직접 설정

wrangler.toml

```
# .dev.vars
name = "edge-server-boilerplate"
compatibility_date = "2023-01-01"

[env.dev.vars]
DATABASE_URL = "libsql://url"

[env.production.vars]
```

### turso 설정

```sh
# db 생성
turso db create edge-boilerplate

# db 정보 조회
turso db show edge-boilerplate

# db 토큰 생성
turso db tokens create edge-boilerplate
```

db 생성 후 토큰은 DB_AUTH_TOKEN 시크릿 키에 저장, db url은 DATABASE_URL 환경변수에 저장
