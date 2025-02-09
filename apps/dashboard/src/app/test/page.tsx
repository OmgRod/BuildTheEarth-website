'use client';

export default function Page() {
	console.log('mbt', process.env.NEXT_PUBLIC_MAPBOX_TOKEN);
	return (
		<>
			<pre>{JSON.stringify(process.env.NEXT_PUBLIC_MAPBOX_TOKEN, null, 2)}</pre>
		</>
	);
}
