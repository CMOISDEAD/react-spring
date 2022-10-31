interface Props {
  show: boolean;
  current: any;
}

export const Modal = ({ show, current }: Props) => {
  if (show) {
    return (
      <div className="fixed top-0 left-0 backdrop-blur-sm p-5 w-full h-screen flex flex-row content-center items-center justify-center">
        <div className="max-h-[95%] w-[30%] bg-[#262626] p-2 rounded-md content-center items-center">
          <div className="text-center p-2 flex-wrap">
            Agregando <span className="italic font-bold">{current.name}</span> a
            la base de datos...
          </div>
          <div className="info py-2 flex content-center justify-center">
            <img
              src={current.image ? current.image : current.cover}
              alt="imagen"
              className="rounded-md object-cover w-auto h-80"
            />
          </div>
          <div className="py-2 text-center">
            <p className="italic text-sm">Estamos trabajando...</p>
          </div>
          <div className="flex items-center justify-center py-2">
            <div
              className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
