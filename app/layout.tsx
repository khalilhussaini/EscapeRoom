// import "./globals.css";
// import Styles from "@/app/styles/escapeRoom.module.css";
// import Link from "next/link";
// export const metadata = {
//   title: "Escape Room",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <div className="game">
//           <div className="game-topbar">
//             <div className="quizTopbar">
//               <Link href="/map" className={Styles.nav2}> Map📍</Link>
//             </div>
//           </div>
//           <div className="game-content">
//             {children}
//           </div>
//         </div>
//       </body>
//     </html>
//   );
// }
import "./globals.css";
import Styles from "@/app/styles/escapeRoom.module.css";
import Link from "next/link";

// ✅ Import TimerProvider
import { TimerProvider } from "./context/TimerContext";

export const metadata = {
  title: "Escape Room",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* ✅ Wrap your entire app with TimerProvider */}
        <TimerProvider>
          <div className="game">
            <div className="game-topbar">
              <div className="quizTopbar">
                <Link href="/map" className={Styles.nav2}> Map📍</Link>
              </div>
            </div>
            <div className="game-content">
              {children}
            </div>
          </div>
        </TimerProvider>
      </body>
    </html>
  );
}
