# 🔗 Zippy

**Zippy**는 긴 URL을 짧게 만들어주는 초경량 URL 단축 서비스입니다.  
Next.js와 AWS DynamoDB 기반으로 제작되었으며, 빠른 성능과 간단한 사용성을 목표로 합니다.

▶️ **Live Demo**: [https://zippy.kangyeol.com/](https://zippy.kangyeol.com/)

---

## 🚀 Features

- ✨ 긴 URL → 짧은 URL 생성
- 🔄 짧은 URL 접속 시 원래 URL로 리디렉션
- ⏱️ 서버리스 기반 빠른 응답
- 🧩 AWS DynamoDB 기반 확장성
- ☁️ Vercel 배포 연동

---

## Brand Concept

Brand Name: Zippy

- 어원: zippy = 빠르고 활기찬
  - 연상되는 키워드:
  - ⚡ 빠름
  - 🔗 연결
  - 💡 단순
  - 📏 간결
  - 🧭 방향

---

## 🧱 Tech Stack

| Layer    | Tech                                                |
| -------- | --------------------------------------------------- |
| Frontend | [Next.js](https://nextjs.org/) (App Router)         |
| API      | Next.js API Route                                   |
| Database | [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) |
| Deploy   | [Vercel](https://vercel.com/)                       |

---

## 📁 Project Structure

```shell
zippy/
├── app/
│ ├── api/
│ │ └── shorten/route.ts # URL 생성 API
│ ├── page.tsx # 메인 페이지
│ └── [shortCode]/ # 리디렉션 처리 라우트
├── lib/
│ └── db.ts # DynamoDB 클라이언트
└── README.md
```

---

## 📦 DynamoDB Table Schema

Table name: ZippyUrls

Primary Key: shortCode (Partition Key)

| Field       | Type       | Description      |
| ----------- | ---------- | ---------------- |
| shortCode   | String     | 단축 URL 키 (PK) |
| originalUrl | String     | 원래 URL         |
| expireAt    | Number     | 만료 기간        |
| createdAt   | ISO String | 생성 시간        |

---

## 🧠 Future Plans

1. TTL 기능 (유효기간 설정)
2. middleware cors 기능
3. rateLimit 기능 (too many request)
4. 통계 대시보드

---

## 📜 License

MIT © 2025 Zippy Project
