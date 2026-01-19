export const metadata = {
  title: 'GitHub Actions Demo',
  description: 'Demo app for GitHub Actions and custom runners',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
