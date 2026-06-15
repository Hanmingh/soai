const BASE_URL = "https://soai-be.soc-ai.workers.dev";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type FetchJsonOptions = {
	method?: HttpMethod;
	body?: unknown;
	headers?: Record<string, string>;
	signal?: AbortSignal;
};

export class ApiError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.name = "ApiError";
		this.status = status;
	}
}

async function fetchJson<T>(path: string, options: FetchJsonOptions = {}): Promise<T> {
	const { method = "GET", body, headers = {}, signal } = options;
	const response = await fetch(`${BASE_URL}${path}`, {
		method,
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			...headers,
		},
		body: body !== undefined ? JSON.stringify(body) : undefined,
		signal,
	});

	const contentType = response.headers.get("content-type") || "";
	const isJson = contentType.includes("application/json");
	const parsed: unknown = isJson ? await response.json().catch(() => ({})) : {};
	const errorPayload =
		typeof parsed === "object" && parsed !== null
			? (parsed as Record<string, unknown>)
			: {};

	if (!response.ok) {
		const responseMessage = errorPayload.message || errorPayload.error;
		const errorMessage =
			(typeof responseMessage === "string" && responseMessage) ||
			response.statusText ||
			"Request failed";
		throw new ApiError(errorMessage, response.status);
	}

	return parsed as T;
}

export type ContactPayload = {
	name?: string;
	email?: string;
	message: string;
};

export async function sendContact(payload: ContactPayload) {
	return fetchJson<{
		success?: boolean;
		message?: string;
	}>("/api/contact", { method: "POST", body: payload });
}

export type RegisterPayload = {
	email: string;
	first_name: string;
	last_name: string;
	middle_name?: string;
	country?: string;
	affiliation?: string;
	title?: string;
	personal_webpage?: string;
	plan: string;
};

export async function registerMember(payload: RegisterPayload) {
	return fetchJson<{
		success?: boolean;
		message?: string;
		member_id?: string;
	}>("/api/register", { method: "POST", body: payload });
}

export type CheckoutPayload = {
	priceId: string;
	successUrl: string;
	cancelUrl: string;
	mode?: "payment" | "subscription";
	metadata?: Record<string, string>;
	quantity?: number;
	amount?: number;   // total amount in SGD — used for team registrations with variable pricing
	allowPromotionCodes?: boolean;
	customerEmail?: string;
};

export async function createCheckoutSession(payload: CheckoutPayload) {
	return fetchJson<{ url: string }>("/api/checkout", { method: "POST", body: payload });
}

export type MemberVerifyPayload = {
	member_id?: string;
	email?: string;
};

export async function verifyMember(payload: MemberVerifyPayload) {
	return fetchJson<{
		ok: boolean;
		member_id?: string;
		email?: string;
		status?: string;
	}>("/api/members/verify", { method: "POST", body: payload });
}

export type NewsItem = {
	id: string;
	title: string;
	date: string;
	source?: string;
	summary?: string;
	link?: string;
};

export async function getNewsList(signal?: AbortSignal) {
	const data = await fetchJson<{ items?: NewsItem[] } | NewsItem[]>("/api/news/list", { method: "GET", signal });
	return Array.isArray(data) ? data : data.items ?? [];
}

export type EventItem = {
	id: string;
	title: string;
	date?: string;
	startDate?: string;
	endDate?: string;
	location?: string;
	description?: string;
	link?: string;
};

export async function getEventsList(signal?: AbortSignal) {
	const data = await fetchJson<{ items?: EventItem[] } | EventItem[]>("/api/events/list", { method: "GET", signal });
	return Array.isArray(data) ? data : data.items ?? [];
}

export type HackathonRegisterPayload = {
	email: string;
	first_name: string;
	last_name: string;
	middle_name?: string;
	title: string;
	country: string;
	affiliation: string;
	personal_webpage?: string;
	membership_status: string;
	soai_member_id?: string;
	isi_member_id?: string;
	registration_type: "individual" | "team";
	team_name?: string;
	team_size?: number;
	team_non_member_count?: number;
	team_members?: { name: string; affiliation: string; email: string }[];
	amount_total?: number;
	currency?: string;
};

export async function registerHackathon(payload: HackathonRegisterPayload) {
	return fetchJson<{
		success: boolean;
		registration_id: string;
		registration_status: string;
		payment_status: string;
	}>("/api/hackathon/register", {
		method: "POST",
		body: payload,
	});
}

export const api = {
	BASE_URL,
	fetchJson,
	sendContact,
	registerMember,
	createCheckoutSession,
	verifyMember,
	getNewsList,
	getEventsList,
};

export default api;


