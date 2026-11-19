export default function PreviewRibbon() {
	return (
		<div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between bg-black px-4 py-2 text-sm text-white">
			<span>Preview mode</span>
			{/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
			<a href="/api/exit-preview" className="underline">
				Exit preview
			</a>
		</div>
	);
}
