# Hackathon Registration — Stripe Integration Guide

> 前端注册流程已完成，只需在 Stripe Dashboard 创建一个 Price，然后把 Price ID 填入一处即可上线支付。

---

## 需要做的事（一处改动）

打开文件：

```
src/data/prices.ts
```

找到以下内容，把空字符串替换成从 Stripe Dashboard 复制的 Price ID：

```ts
export const hackathonPrices = {
  member: {
    amount: 0,
    currency: "SGD",
    priceId: "",          // 免费，不需要 Stripe，保持空即可
  },
  nonMember: {
    amount: 100,
    currency: "SGD",
    priceId: "price_xxx", // ← 在这里填入 Stripe Price ID
  },
};
```

---

## 在 Stripe Dashboard 怎么创建这个 Price

1. 登录 [Stripe Dashboard](https://dashboard.stripe.com)
2. 进入 **Products** → **Add product**
3. 填写：
   - **Name**：`SoAI 2026 AI Trading Hackathon — Non-member Registration`
   - **Price**：`100.00 SGD`
   - **Billing**：One time（一次性付款）
4. 创建后复制 Price ID（格式：`price_xxxxxxxxxxxxxxxxxx`）
5. 粘贴到 `src/data/prices.ts` 的 `priceId` 字段

> ⚠️ 注意区分 **Test mode** 和 **Live mode**。开发调试用 Test mode 的 Price ID，上线生产时换成 Live mode 的。

---

## 支付流程说明

### 免费路径（SoAI 会员）

当用户选择以下身份之一时，**不走 Stripe**，直接在前端标记注册完成：

- Existing SoAI member
- Joining SoAI as new member
- ISI member

### 付费路径（非会员）

个人注册或团队注册中含有非会员时，前端调用后端接口创建 Checkout Session：

```
POST /api/checkout
```

请求体（`CheckoutPayload`，定义见 `src/lib/api.ts`）：

```json
{
  "priceId": "price_xxx",
  "quantity": 1,
  "mode": "payment",
  "allowPromotionCodes": true,
  "customerEmail": "user@example.com",
  "successUrl": "https://soc-ai.org/payment-success?event=IntelligenceX%202026%20Hackathon",
  "cancelUrl": "https://soc-ai.org/events/intelligencex-2026/hackathon-register?checkout=cancel",
  "metadata": {
    "event": "IntelligenceX 2026 AI Trading Hackathon",
    "registration_type": "individual | team",
    "full_name": "...",
    "email": "...",
    "country": "...",
    "affiliation": "...",
    "membership_status": "nonmember",
    // 团队注册时额外包含：
    "team_name": "...",
    "team_size": "3",
    "team_non_member_count": "2"
  }
}
```

### quantity 逻辑

| 注册类型 | quantity 值 |
|----------|-------------|
| 个人非会员 | `1` |
| 团队（含 N 名非会员） | `N`（非会员人数） |
| 全员 SoAI 会员 | 不走 Stripe |

**举例**：3 人团队中 2 人非会员 → `quantity = 2` → 结算金额 `SGD 200`

---

## 成功 / 取消跳转

| 情形 | 跳转地址 |
|------|----------|
| 支付成功 | `/payment-success?event=IntelligenceX%202026%20Hackathon` |
| 用户取消 | `/events/intelligencex-2026/hackathon-register?checkout=cancel` |

`/payment-success` 页面已存在（复用会议注册的同一页面），会读取 `?event=` 参数显示对应活动名称。

---

## 后端接口

`/api/checkout` 接口已由现有 Cloudflare Worker 提供，与会议注册共用同一个 endpoint，**不需要新增接口**。

如需验证支付结果或在 Webhook 中处理 hackathon 注册数据，可通过 `metadata.event` 字段区分：

```
metadata.event === "IntelligenceX 2026 AI Trading Hackathon"
```

---

## 测试建议

1. 填入 Stripe **Test mode** Price ID
2. 访问 `http://localhost:5174/events/intelligencex-2026/hackathon-register`
3. 选择非会员身份，填写表单，点击 **Proceed to Payment**
4. 使用 Stripe 测试卡 `4242 4242 4242 4242` 完成支付
5. 确认跳转到 `/payment-success` 页面
6. 在 Stripe Dashboard → Events 确认 `checkout.session.completed` 事件触发，检查 metadata 字段

上线前将 `priceId` 换成 Live mode Price ID 即可。
