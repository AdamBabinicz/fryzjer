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
        src: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
        fullSrc: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=90',
        alt: 'Fryzura damska - blond'
      },
      {
        src: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
        fullSrc: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=90',
        alt: 'Upięcie wieczorowe'
      },
      {
        src: 'https://pixabay.com/get/g09910ac3493e3247a4aec8f174c17f503fcac1e89bbad659570945b711645980ae8ddc8eede8fba5ce91672a7c6b25b060265540bed86d7743d3fe71bb141ff3_1280.jpg',
        fullSrc: 'https://images.unsplash.com/photo-1622296089863-eb7fc530ddb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=90',
        alt: 'Męskie klasyczne cięcie'
      }
    ]
  },
  {
    images: [
      {
        src: 'https://images.unsplash.com/photo-1562572766-953b8ab55ae1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
        fullSrc: 'https://images.unsplash.com/photo-1562572766-953b8ab55ae1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=90',
        alt: 'Koloryzacja - balayage'
      },
      {
        src: 'https://pixabay.com/get/g6e2fa5236f596e00776fb7cc77d748d759e618d3ce15469a85c0f0680ac01a54591e8556ecbca78daf11279afd55b57b716cf94c8b88723365acc84daf44a54e_1280.jpg',
        fullSrc: 'https://images.unsplash.com/photo-1594515254690-2247055f4d86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=90',
        alt: 'Koloryzacja - rude'
      },
      {
        src: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
        fullSrc: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=90',
        alt: 'Męskie cięcie - undercut'
      }
    ]
  },
  {
    images: [
      {
        src: 'https://pixabay.com/get/g15b5d239401d6d8130872823445470b459ac9430da8aec43dd70e3e27440898702646081fccca20e3d8f2a9dc78ad591944dcc1f932b1d50120cb9dd08d93eb5_1280.jpg',
        fullSrc: 'https://images.unsplash.com/photo-1579123261459-a1e8fc66b5c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=90',
        alt: 'Fryzura ślubna'
      },
      {
        src: 'https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
        fullSrc: 'https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=90',
        alt: 'Krótkie cięcie damskie'
      },
      {
        src: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
        fullSrc: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=90',
        alt: 'Stylizacja brody'
      }
    ]
  }
];
