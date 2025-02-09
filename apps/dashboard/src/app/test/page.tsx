'use client';

export default function Page() {
	return (
		<>
			<pre>{JSON.stringify(process.env.NEXT_PUBLIC_MAPBOX_TOKEN, null, 2)}</pre>
		</>
	);
}
