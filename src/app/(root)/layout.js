
import Header from "@/components/common/Header";


export default function RootLayout({ children }) {
  return (
    <>
        <Header/>
        {children}
    </>
  );
}
