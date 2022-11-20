import { SectionHeader } from "./SectionHeader";

export const Playlist = () => {
  return (
    <>
      <SectionHeader title="Playlist" subtitle="See All" />
      <div className="w-full inline-flex gap-4 overflow-x-scroll">
        {[
          "https://i.scdn.co/image/ab67706f00000003b1496df70548b3e43c25b0d4",
          "https://i.scdn.co/image/ab67706f0000000375766e3912cd4f034ec73ea3",
          "https://thisis-images.scdn.co/37i9dQZF1DZ06evO4jkBCE-large.jpg",
          "https://thisis-images.scdn.co/37i9dQZF1DZ06evO2J2IMM-large.jpg",
          "https://i.scdn.co/image/ab67706f000000037a181d9fed936372672c40ca",
        ].map((playlist, i) => (
          <img
            src={playlist}
            alt="Nas"
            key={i}
            className="w-6/12 rounded-md my-2"
          />
        ))}
      </div>
    </>
  );
};
