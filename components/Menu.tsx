import Link from "next/link";

import { Maraude } from "@/types/maraude";
import AddFloatingButton from "@/components/AddFloatingButton";
import MaraudeCard from "@/components/MaraudeCard";

const Menu = ({
  maraudes,
  menuOpen,
  selectedMaraudeID,
  onSelect,
  onHover,
}: {
  maraudes: Maraude[];
  menuOpen: boolean;
  selectedMaraudeID: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}) => {
  return (
    <>
      <div
        className={`absolute top-0 left-0 h-screen bg-white shadow-lg transition-transform transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } w-[400px] z-10`}
      >
        <div className="mt-24 overflow-auto h-[calc(100%-6rem)]">
          <div>
            {maraudes.map((maraude) => (
              <div
                key={maraude.id}
                className={`max-w-sm bg-white rounded-lg shadow p-2 mb-2 hover:bg-gray-100 ${
                  maraude.id === selectedMaraudeID ? "bg-gray-100" : ""
                }`}
                onClick={() => onSelect(maraude.id)}
                onMouseEnter={() => onHover(maraude.id)}
                onMouseLeave={() => onHover(null)}
              >
                <MaraudeCard maraude={maraude} isCompact/>
              </div>
            ))}
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="absolute bottom-4 left-[300px] z-20">
          <Link href="/maraude/create" passHref>
            <AddFloatingButton />
          </Link>
        </div>
      )}
    </>
  );
};

export default Menu;
