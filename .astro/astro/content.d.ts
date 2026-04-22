declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"biggest-social-media-mistakes-businesses.md": {
	id: "biggest-social-media-mistakes-businesses.md";
  slug: "biggest-social-media-mistakes-businesses";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"blogging-drives-traffic-and-sales.md": {
	id: "blogging-drives-traffic-and-sales.md";
  slug: "blogging-drives-traffic-and-sales";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"build-authority-with-content.md": {
	id: "build-authority-with-content.md";
  slug: "build-authority-with-content";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"complete-digital-marketing-guide-south-africa.md": {
	id: "complete-digital-marketing-guide-south-africa.md";
  slug: "complete-digital-marketing-guide-south-africa";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"content-marketing-backbone-online-success.md": {
	id: "content-marketing-backbone-online-success.md";
  slug: "content-marketing-backbone-online-success";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"content-strategy-what-to-post.md": {
	id: "content-strategy-what-to-post.md";
  slug: "content-strategy-what-to-post";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"custom-vs-template-website-south-africa.md": {
	id: "custom-vs-template-website-south-africa.md";
  slug: "custom-vs-template-website-south-africa";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"evergreen-vs-trending-content.md": {
	id: "evergreen-vs-trending-content.md";
  slug: "evergreen-vs-trending-content";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"fast-website-doubles-sales.md": {
	id: "fast-website-doubles-sales.md";
  slug: "fast-website-doubles-sales";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"generate-leads-online-without-paid-ads.md": {
	id: "generate-leads-online-without-paid-ads.md";
  slug: "generate-leads-online-without-paid-ads";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"google-ads-medical-practice.md": {
	id: "google-ads-medical-practice.md";
  slug: "google-ads-medical-practice";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"healthcare-website-must-haves.md": {
	id: "healthcare-website-must-haves.md";
  slug: "healthcare-website-must-haves";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"high-converting-website-breakdown.md": {
	id: "high-converting-website-breakdown.md";
  slug: "high-converting-website-breakdown";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-rank-1-google-south-africa.md": {
	id: "how-to-rank-1-google-south-africa.md";
  slug: "how-to-rank-1-google-south-africa";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"instagram-vs-facebook-ads-south-africa.md": {
	id: "instagram-vs-facebook-ads-south-africa.md";
  slug: "instagram-vs-facebook-ads-south-africa";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"local-seo-medical-practice.md": {
	id: "local-seo-medical-practice.md";
  slug: "local-seo-medical-practice";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"local-seo-south-africa-guide.md": {
	id: "local-seo-south-africa-guide.md";
  slug: "local-seo-south-africa-guide";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"marketing-trends-south-africa-2026.md": {
	id: "marketing-trends-south-africa-2026.md";
  slug: "marketing-trends-south-africa-2026";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"on-page-vs-technical-seo.md": {
	id: "on-page-vs-technical-seo.md";
  slug: "on-page-vs-technical-seo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"seo-content-writing-rank-and-convert.md": {
	id: "seo-content-writing-rank-and-convert.md";
  slug: "seo-content-writing-rank-and-convert";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"social-media-grow-business-90-days.md": {
	id: "social-media-grow-business-90-days.md";
  slug: "social-media-grow-business-90-days";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"top-10-website-mistakes-costing-customers.md": {
	id: "top-10-website-mistakes-costing-customers.md";
  slug: "top-10-website-mistakes-costing-customers";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"turn-followers-into-paying-customers.md": {
	id: "turn-followers-into-paying-customers.md";
  slug: "turn-followers-into-paying-customers";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"what-is-seo-business-survival.md": {
	id: "what-is-seo-business-survival.md";
  slug: "what-is-seo-business-survival";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"why-business-needs-digital-marketing-strategy.md": {
	id: "why-business-needs-digital-marketing-strategy.md";
  slug: "why-business-needs-digital-marketing-strategy";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"why-business-needs-professional-website-2026.md": {
	id: "why-business-needs-professional-website-2026.md";
  slug: "why-business-needs-professional-website-2026";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"why-website-not-ranking-fix.md": {
	id: "why-website-not-ranking-fix.md";
  slug: "why-website-not-ranking-fix";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"zero-to-online-presence-step-by-step.md": {
	id: "zero-to-online-presence-step-by-step.md";
  slug: "zero-to-online-presence-step-by-step";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
