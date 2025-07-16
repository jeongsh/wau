
### 프리즈마 마이그레이션 초기화하는 명령어
> npx prisma migrate reset

### 프리즈마 마이그레이션 명령어
> npm run prisma:migrate
```
프로젝트에서 prisma model의 값 변경 및 추가 되었다면
npm run prisma:migrate 명령어 실행
  1. npx prisma migrate dev --create-only 실행됨
    - 마이그레이션 파일만 생성
    - 실제 DB에는 적용X
    - 주로 마이그레이션 파일을 검토하거나 버전 관리를 위해 별도로 커밋하고 싶은 경우 사용
  2. npx prisma migrate dev 실행됨
    - 실제 데이터베이스에 반영
    - 동시에 schema.prisma와 DB 상태가 일치하도록 Prisma Client도 자동 재생성
```

### 직접 디비 필드및 테이블 변경시 프로젝트와 동기화 명령어
> npm run prisma:pull
```
heidiSQL등 sql tool을 통해 직접 테이블 및 필드 변경을 시켰다면
npm run prisma:pull 명령어 실행
  1. npx prisma db pull 실행됨
    - 디비와 싱크 연결후 prisma client 재생성
    - DB → Prisma 방향의 동기화. (예: SQL 툴로 직접 수정한 경우)
  2. npx prisma generate 실행됨
    - 변경된 schema.prisma 기반으로 Prisma Client를 재생성
    - 이를 통해 코드에서 변경된 DB 구조를 사용
```
