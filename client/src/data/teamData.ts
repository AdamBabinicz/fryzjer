export interface TeamMember {
  name: string;
  position: string;
  image: string;
}

export const teamData: TeamMember[] = [
  {
    name: 'Anna Kowalska',
    position: 'Główna Stylistka',
    image: 'https://pixabay.com/get/g2b460718aaca22630dad1b014bfd821dadc6f898aef0c8d2bc6a635effbcca1ee71572501a939006019f8e0c7b1ee6d8b608aaad20bbf8159b24e34281cdcb2d_1280.jpg'
  },
  {
    name: 'Marcin Nowak',
    position: 'Stylista Kreatywny',
    image: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80'
  },
  {
    name: 'Katarzyna Wiśniewska',
    position: 'Kolorystka',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80'
  },
  {
    name: 'Piotr Zieliński',
    position: 'Barber',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80'
  }
];
