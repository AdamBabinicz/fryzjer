export interface ServiceType {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: string;
  image: string;
}

export const haircutServices: ServiceType[] = [
  {
    id: 'haircut-women',
    title: 'Women\'s Haircut',
    shortDescription: 'Precise haircut considering hair type and face shape, finished with professional styling.',
    fullDescription: `
      <p>We offer professional women's haircuts that include:</p>
      <ul>
        <li>Consultation with a stylist</li>
        <li>Hair washing with specialized products</li>
        <li>Precise scissor cutting</li>
        <li>Styling and modeling</li>
        <li>Home care advice</li>
      </ul>
      <p>Service duration: 45-60 minutes.</p>
    `,
    price: 'from $20',
    image: 'https://images.unsplash.com/photo-1622288432450-277d0fef5ed6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 'haircut-men',
    title: 'Men\'s Haircut',
    shortDescription: 'Classic or modern men\'s haircut tailored to individual preferences.',
    fullDescription: `
      <p>Professional men's haircut in our salon includes:</p>
      <ul>
        <li>Consultation with a stylist</li>
        <li>Hair washing with specialized products</li>
        <li>Precise cutting adapted to hair type and face</li>
        <li>Styling and modeling</li>
        <li>Home care advice</li>
      </ul>
      <p>Service duration: 30-45 minutes.</p>
    `,
    price: 'from $15',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 'haircut-children',
    title: 'Children\'s Haircut',
    shortDescription: 'Gentle haircut for the youngest in a friendly atmosphere. Up to 12 years of age.',
    fullDescription: `
      <p>Our children's haircut was designed with the comfort of our youngest clients in mind:</p>
      <ul>
        <li>Friendly approach and stylist patience</li>
        <li>Gentle washing and cutting</li>
        <li>Ability to use tablet or toys during haircut</li>
        <li>Light styling at the end</li>
        <li>Small gift for the child</li>
      </ul>
      <p>Service for children up to 12 years old.</p>
      <p>Duration: 20-30 minutes.</p>
    `,
    price: 'from $12',
    image: 'https://pixabay.com/get/gca7473447b4df7f8ea1f0be828b52f34831142958514661f704415fdfeefe3abf2a95d5e9ceee4657e0a1dc8211a5bdf893e7ce5eb696057b86493384312b25c_1280.jpg'
  }
];

export const stylingServices: ServiceType[] = [
  {
    id: 'styling-updo',
    title: 'Special Occasion Updo',
    shortDescription: 'Elegant hairstyles for weddings, parties and other important events.',
    fullDescription: `
      <p>We specialize in creating elegant updos for special occasions:</p>
      <ul>
        <li>Consultation and appropriate style selection</li>
        <li>Hair preparation (washing, drying)</li>
        <li>Professional styling using the highest quality products</li>
        <li>Hair decorations (optional)</li>
        <li>Setting the hairstyle for long-lasting effect</li>
      </ul>
      <p>We recommend booking in advance, especially during wedding season.</p>
      <p>Duration: 60-90 minutes depending on hair length and style complexity.</p>
    `,
    price: 'from $40',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 'styling-blowout',
    title: 'Hair Styling',
    shortDescription: 'Professional hair styling tailored to haircut shape and occasion.',
    fullDescription: `
      <p>Our hair styling is a comprehensive styling service:</p>
      <ul>
        <li>Hair washing with shampoos selected for hair type</li>
        <li>Nourishment with specialized products</li>
        <li>Styling using a dryer and brushes</li>
        <li>Final styling with professional cosmetics</li>
      </ul>
      <p>Duration: 30-60 minutes depending on hair length and density.</p>
    `,
    price: 'from $18',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 'styling-treatment',
    title: 'Hair Treatments',
    shortDescription: 'Regeneration and nourishment of hair using professional products.',
    fullDescription: `
      <p>We offer a range of hair care treatments:</p>
      <ul>
        <li>Intensive regeneration of damaged hair</li>
        <li>Moisturizing treatments for dry hair</li>
        <li>Hair loss prevention treatments</li>
        <li>Therapies for colored hair</li>
        <li>Volume enhancing treatments</li>
      </ul>
      <p>Each treatment begins with a consultation during which we select the appropriate therapy for your hair needs.</p>
      <p>Duration: 45-60 minutes.</p>
    `,
    price: 'from $25',
    image: 'https://pixabay.com/get/g8ac1f63f0c2dc5437ee064f406ddc5b3ff212c84a06748dddf42a23a5aa93b9e9bcd0321e2b4df62f6b5e5928f26961bc93efff3ed60cc99450ff9027715bcbb_1280.jpg'
  }
];

export const coloringServices: ServiceType[] = [
  {
    id: 'coloring-full',
    title: 'Full Color',
    shortDescription: 'Color change of whole hair using the highest quality coloring products.',
    fullDescription: `
      <p>Our full color service includes:</p>
      <ul>
        <li>Color consultation and shade selection</li>
        <li>Hair preparation for coloring</li>
        <li>Application of high-quality hair dyes</li>
        <li>Post-coloring care</li>
        <li>Styling and finishing</li>
      </ul>
      <p>All products used for coloring are of the highest quality to minimize hair damage.</p>
      <p>Duration: 90-120 minutes depending on hair length.</p>
    `,
    price: 'from $30',
    image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 'coloring-highlights',
    title: 'Highlights & Lowlights',
    shortDescription: 'Brightening the hairstyle by adding lighter strands in various techniques.',
    fullDescription: `
      <p>We offer professional hair highlighting techniques:</p>
      <ul>
        <li>Classic highlights</li>
        <li>Balayage</li>
        <li>Ombre/Sombre</li>
        <li>Babylights</li>
        <li>Flamboyage</li>
      </ul>
      <p>Before the treatment, we conduct a thorough consultation to choose a technique that perfectly suits your needs and appearance.</p>
      <p>Duration: 120-180 minutes depending on technique and hair length.</p>
    `,
    price: 'from $38',
    image: 'https://pixabay.com/get/g4e597f356d6fcb04eb7c8122af2983d1edbd41aaef4e7ff832ff9ae2bbcfa9dfd0ac7df5e92dd7918542948bccc5f2b0bb24d0979b7e5aea916a5506eee1acc6_1280.jpg'
  },
  {
    id: 'coloring-creative',
    title: 'Creative Coloring',
    shortDescription: 'Non-standard colors and techniques for people looking for original solutions.',
    fullDescription: `
      <p>Creative coloring is a proposal for bold individuals who want to express their personality through hair color:</p>
      <ul>
        <li>Intense, non-standard colors</li>
        <li>Multi-color techniques</li>
        <li>Colorful ombre</li>
        <li>Spatial color effects</li>
        <li>Individual color projects</li>
      </ul>
      <p>For intense colors, prior hair lightening may be necessary.</p>
      <p>Before the treatment, we recommend a consultation to assess hair condition and the possibility of achieving the desired effect.</p>
      <p>Duration: 180-240 minutes depending on project complexity.</p>
    `,
    price: 'from $50',
    image: 'https://pixabay.com/get/g12b8c048f60a67c365fab2506963b388872687be0e8eaa48be9d9b6a59956dbd42cc86332b68146d85437777fbefa2124d99f6f28d456873f8e356a6e19da7e3_1280.jpg'
  }
];