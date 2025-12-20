import Image from "next/image";

export default function MediaIcons() {
  return (
    <div className=" font-bold fixed gap-5 items-center justify-center  pl-2  z-50 top-60 right-0 rounded-l-md">
      <Image
        src="/facebook.webp"
        width={50}
        height={50}
        alt="facebook"
        className="hover:rounded-l-md hover:scale-x-125 transition-all ease-out duration-300"
      />
      <Image
        src="/whatsapp1.jpg"
        width={50}
        height={50}
        alt="whatsapp"
        className="hover:rounded-l-md hover:scale-x-125 transition-all ease-out duration-300"
      />
      <Image
        src="/reddit.png"
        width={50}
        height={50}
        alt="reddiet"
        className="hover:rounded-l-md hover:scale-x-125 transition-all ease-out duration-300"
      />
      <Image
        src="/sideLogo.png"
        width={50}
        height={50}
        alt="logo"
        className="hover:rounded-l-md hover:scale-x-125 transition-all ease-out duration-300"
      />
    </div>
  );
}
