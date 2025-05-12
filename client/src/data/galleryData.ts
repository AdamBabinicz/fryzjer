interface GalleryImage {
  src: string;
  fullSrc: string;
  alt: string;
}

interface GallerySlide {
  images: GalleryImage[];
}

export const galleryData: GallerySlide[] = [
  {
    images: [
      {
        src: "/assets/2.avif",
        fullSrc: "/assets/2.avif",
        alt: "Fryzura damska - blond",
      },
      {
        src: "/assets/3.avif",
        fullSrc: "/assets/3.avif",
        alt: "Upięcie wieczorowe",
      },
      {
        src: "/assets/5.avif",
        fullSrc: "/assets/5.avif",
        alt: "Męskie klasyczne cięcie",
      },
    ],
  },
  {
    images: [
      {
        src: "/assets/8.avif",
        fullSrc: "/assets/8.avif",
        alt: "Koloryzacja - balayage",
      },
      {
        src: "/assets/11.avif",
        fullSrc: "/assets/11.avif",
        alt: "Koloryzacja - rude",
      },
      {
        src: "/assets/12.avif",
        fullSrc: "/assets/12.avif",
        alt: "Męskie cięcie - undercut",
      },
    ],
  },
  {
    images: [
      {
        src: "/assets/14.avif",
        fullSrc: "/assets/14.avif",
        alt: "Fryzura ślubna",
      },
      {
        src: "/assets/16.avif",
        fullSrc: "/assets/16.avif",
        alt: "Krótkie cięcie damskie",
      },
      {
        src: "/assets/18.avif",
        fullSrc: "/assets/18.avif",
        alt: "Stylizacja brody",
      },
    ],
  },
  {
    images: [
      {
        src: "/assets/57.avif",
        fullSrc: "/assets/57.avif",
        alt: "Fryzura ślubna",
      },
      {
        src: "/assets/61.avif",
        fullSrc: "/assets/61.avif",
        alt: "Krótkie cięcie damskie",
      },
      {
        src: "/assets/59.avif",
        fullSrc: "/assets/59.avif",
        alt: "Stylizacja brody",
      },
    ],
  },
  {
    images: [
      {
        src: "/assets/24.avif",
        fullSrc: "/assets/24.avif",
        alt: "Fryzura ślubna",
      },
      {
        src: "/assets/26.avif",
        fullSrc: "/assets/26.avif",
        alt: "Krótkie cięcie damskie",
      },
      {
        src: "/assets/27.avif",
        fullSrc: "/assets/27.avif",
        alt: "Stylizacja brody",
      },
    ],
  },
  {
    images: [
      {
        src: "/assets/28.avif",
        fullSrc: "/assets/28.avif",
        alt: "Fryzura ślubna",
      },
      {
        src: "/assets/30.avif",
        fullSrc: "/assets/30.avif",
        alt: "Krótkie cięcie damskie",
      },
      {
        src: "/assets/31.avif",
        fullSrc: "/assets/31.avif",
        alt: "Stylizacja brody",
      },
    ],
  },
  {
    images: [
      {
        src: "/assets/56.avif",
        fullSrc: "/assets/56.avif",
        alt: "Fryzura ślubna",
      },
      {
        src: "/assets/42.avif",
        fullSrc: "/assets/42.avif",
        alt: "Krótkie cięcie damskie",
      },
      {
        src: "/assets/48.avif",
        fullSrc: "/assets/48.avif",
        alt: "Stylizacja brody",
      },
    ],
  },
];
