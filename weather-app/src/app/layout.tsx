import '@/app/globals.scss';

export const metadata = {
  title: 'Weather forecst',
  description: 'Check the weather in your city',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
