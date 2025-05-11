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
    id: "haircut-women",
    title: "Women's Haircut",
    shortDescription:
      "Precise haircut considering hair type and face shape, finished with professional styling.",
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
    price: "from PLN 80",
    image: "/assets/51.avif",
  },
  {
    id: "haircut-men",
    title: "Men's Haircut",
    shortDescription:
      "Classic or modern men's haircut tailored to individual preferences.",
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
    price: "from PLN 45",
    image: "/assets/50.avif",
  },
  {
    id: "haircut-children",
    title: "Children's Haircut",
    shortDescription:
      "Gentle haircut for the youngest in a friendly atmosphere. Up to 12 years of age.",
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
    price: "from PLN 40",
    image: "/assets/60.avif",
  },
];

export const stylingServices: ServiceType[] = [
  {
    id: "styling-updo",
    title: "Special Occasion Updo",
    shortDescription:
      "Elegant hairstyles for weddings, parties and other important events.",
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
    price: "from PLN 150",
    image: "/assets/35.avif",
  },
  {
    id: "styling-blowout",
    title: "Hair Styling",
    shortDescription:
      "Professional hair styling tailored to haircut shape and occasion.",
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
    price: "from PLN 70",
    image: "/assets/45.avif",
  },
  {
    id: "styling-treatment",
    title: "Hair Treatments",
    shortDescription:
      "Regeneration and nourishment of hair using professional products.",
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
    price: "from PLN 100",
    image: "/assets/43.avif",
  },
];

export const coloringServices: ServiceType[] = [
  {
    id: "coloring-full",
    title: "Full Color",
    shortDescription:
      "Color change of whole hair using the highest quality coloring products.",
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
    price: "from PLN 120",
    image: "/assets/21.avif",
  },
  {
    id: "coloring-highlights",
    title: "Highlights & Lowlights",
    shortDescription:
      "Brightening the hairstyle by adding lighter strands in various techniques.",
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
    price: "from PLN 150",
    image: "/assets/9.avif",
  },
  {
    id: "coloring-creative",
    title: "Creative Coloring",
    shortDescription:
      "Non-standard colors and techniques for people looking for original solutions.",
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
    price: "from PLN 200",
    image: "/assets/39.avif",
  },
];
