const BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL /* || "http://127.0.0.1:8787" */ || "https://soai-be.soc-ai.workers.dev";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type FetchJsonOptions = {
	method?: HttpMethod;
	body?: unknown;
	headers?: Record<string, string>;
	signal?: AbortSignal;
};

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
	const parsed = isJson ? await response.json().catch(() => ({})) : ({} as any);

	if (!response.ok) {
		const errorMessage = (parsed && (parsed.message || parsed.error)) || response.statusText || "Request failed";
		throw new Error(errorMessage);
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

export const api = {
	BASE_URL,
	fetchJson,
	sendContact,
	registerMember,
	getNewsList,
	getEventsList,
};

export default api;


