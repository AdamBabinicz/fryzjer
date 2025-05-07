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
    title: 'Strzyżenie damskie',
    shortDescription: 'Precyzyjne strzyżenie uwzględniające typ włosów i kształt twarzy, zakończone profesjonalną stylizacją.',
    fullDescription: `
      <p>Oferujemy profesjonalne strzyżenie damskie, które obejmuje:</p>
      <ul>
        <li>Konsultację ze stylistą</li>
        <li>Mycie włosów specjalistycznymi produktami</li>
        <li>Precyzyjne strzyżenie nożyczkami</li>
        <li>Stylizację i modelowanie</li>
        <li>Doradztwo w zakresie pielęgnacji domowej</li>
      </ul>
      <p>Czas trwania usługi: 45-60 minut.</p>
    `,
    price: 'od 80 zł',
    image: 'https://images.unsplash.com/photo-1622288432450-277d0fef5ed6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 'haircut-men',
    title: 'Strzyżenie męskie',
    shortDescription: 'Klasyczne lub nowoczesne strzyżenie męskie dostosowane do indywidualnych preferencji.',
    fullDescription: `
      <p>Profesjonalne strzyżenie męskie w naszym salonie obejmuje:</p>
      <ul>
        <li>Konsultację ze stylistą</li>
        <li>Mycie włosów specjalistycznymi produktami</li>
        <li>Precyzyjne strzyżenie dostosowane do typu włosów i twarzy</li>
        <li>Stylizację i modelowanie</li>
        <li>Doradztwo w zakresie pielęgnacji domowej</li>
      </ul>
      <p>Czas trwania usługi: 30-45 minut.</p>
    `,
    price: 'od 60 zł',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 'haircut-children',
    title: 'Strzyżenie dziecięce',
    shortDescription: 'Delikatne strzyżenie dla najmłodszych w przyjaznej atmosferze. Do 12 roku życia.',
    fullDescription: `
      <p>Nasze strzyżenie dziecięce zostało stworzone z myślą o komforcie najmłodszych klientów:</p>
      <ul>
        <li>Przyjazne podejście i cierpliwość stylisty</li>
        <li>Delikatne mycie i strzyżenie</li>
        <li>Możliwość skorzystania z tabletu lub zabawek w trakcie strzyżenia</li>
        <li>Lekka stylizacja na zakończenie</li>
        <li>Drobny upominek dla dziecka</li>
      </ul>
      <p>Usługa przeznaczona dla dzieci do 12 roku życia.</p>
      <p>Czas trwania: 20-30 minut.</p>
    `,
    price: 'od 50 zł',
    image: 'https://pixabay.com/get/gca7473447b4df7f8ea1f0be828b52f34831142958514661f704415fdfeefe3abf2a95d5e9ceee4657e0a1dc8211a5bdf893e7ce5eb696057b86493384312b25c_1280.jpg'
  }
];

export const stylingServices: ServiceType[] = [
  {
    id: 'styling-updo',
    title: 'Upięcia okolicznościowe',
    shortDescription: 'Eleganckie fryzury na śluby, wesela i inne ważne uroczystości.',
    fullDescription: `
      <p>Specjalizujemy się w tworzeniu eleganckich upięć na wyjątkowe okazje:</p>
      <ul>
        <li>Konsultacja i wybór odpowiedniego stylu</li>
        <li>Przygotowanie włosów (mycie, suszenie)</li>
        <li>Profesjonalne upięcie z wykorzystaniem najwyższej jakości produktów</li>
        <li>Dekoracje włosów (opcjonalnie)</li>
        <li>Utrwalenie fryzury dla długotrwałego efektu</li>
      </ul>
      <p>Rekomendujemy rezerwację terminu z wyprzedzeniem, szczególnie w sezonie ślubnym.</p>
      <p>Czas trwania: 60-90 minut w zależności od długości włosów i stopnia skomplikowania fryzury.</p>
    `,
    price: 'od 150 zł',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 'styling-blowout',
    title: 'Modelowanie',
    shortDescription: 'Profesjonalna stylizacja włosów dopasowana do kształtu fryzury i okazji.',
    fullDescription: `
      <p>Nasze modelowanie włosów to kompleksowa usługa stylizacyjna:</p>
      <ul>
        <li>Mycie włosów dobranymi do ich rodzaju szamponami</li>
        <li>Odżywienie specjalistycznymi produktami</li>
        <li>Modelowanie przy użyciu suszarki i szczotek</li>
        <li>Stylizacja końcowa z użyciem profesjonalnych kosmetyków</li>
      </ul>
      <p>Czas trwania: 30-60 minut w zależności od długości i gęstości włosów.</p>
    `,
    price: 'od 70 zł',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 'styling-treatment',
    title: 'Zabiegi pielęgnacyjne',
    shortDescription: 'Regeneracja i odżywienie włosów przy użyciu profesjonalnych produktów.',
    fullDescription: `
      <p>Oferujemy szereg zabiegów pielęgnacyjnych dla Twoich włosów:</p>
      <ul>
        <li>Intensywna regeneracja zniszczonych włosów</li>
        <li>Zabiegi nawilżające dla włosów suchych</li>
        <li>Kuracje przeciw wypadaniu włosów</li>
        <li>Terapie dla włosów farbowanych</li>
        <li>Zabiegi zwiększające objętość</li>
      </ul>
      <p>Każdy zabieg rozpoczyna się od konsultacji, podczas której dobieramy odpowiednią terapię do potrzeb Twoich włosów.</p>
      <p>Czas trwania: 45-60 minut.</p>
    `,
    price: 'od 100 zł',
    image: 'https://pixabay.com/get/g8ac1f63f0c2dc5437ee064f406ddc5b3ff212c84a06748dddf42a23a5aa93b9e9bcd0321e2b4df62f6b5e5928f26961bc93efff3ed60cc99450ff9027715bcbb_1280.jpg'
  }
];

export const coloringServices: ServiceType[] = [
  {
    id: 'coloring-full',
    title: 'Koloryzacja jednolita',
    shortDescription: 'Zmiana koloru całych włosów z użyciem najwyższej jakości produktów do koloryzacji.',
    fullDescription: `
      <p>Nasza usługa koloryzacji jednolitej obejmuje:</p>
      <ul>
        <li>Konsultację kolorystyczną i dobór odcienia</li>
        <li>Przygotowanie włosów do koloryzacji</li>
        <li>Zastosowanie wysokiej jakości farb fryzjerskich</li>
        <li>Pielęgnację po koloryzacji</li>
        <li>Modelowanie i stylizację</li>
      </ul>
      <p>Wszystkie produkty używane do koloryzacji są najwyższej jakości, by zminimalizować uszkodzenia włosów.</p>
      <p>Czas trwania: 90-120 minut w zależności od długości włosów.</p>
    `,
    price: 'od 120 zł',
    image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 'coloring-highlights',
    title: 'Pasemka i refleksy',
    shortDescription: 'Rozświetlenie fryzury poprzez dodanie jaśniejszych pasemek w różnych technikach.',
    fullDescription: `
      <p>Oferujemy profesjonalne techniki rozświetlania włosów:</p>
      <ul>
        <li>Klasyczne pasemka</li>
        <li>Balayage</li>
        <li>Ombre/Sombre</li>
        <li>Babylights</li>
        <li>Flamboyage</li>
      </ul>
      <p>Przed wykonaniem zabiegu przeprowadzamy dokładną konsultację, by dobrać technikę idealnie pasującą do Twoich potrzeb i typu urody.</p>
      <p>Czas trwania: 120-180 minut w zależności od techniki i długości włosów.</p>
    `,
    price: 'od 150 zł',
    image: 'https://pixabay.com/get/g4e597f356d6fcb04eb7c8122af2983d1edbd41aaef4e7ff832ff9ae2bbcfa9dfd0ac7df5e92dd7918542948bccc5f2b0bb24d0979b7e5aea916a5506eee1acc6_1280.jpg'
  },
  {
    id: 'coloring-creative',
    title: 'Koloryzacja kreatywna',
    shortDescription: 'Niestandardowe kolory i techniki dla osób poszukujących oryginalnych rozwiązań.',
    fullDescription: `
      <p>Koloryzacja kreatywna to propozycja dla odważnych osób, które chcą wyrazić swoją osobowość przez kolor włosów:</p>
      <ul>
        <li>Intensywne, niestandardowe kolory</li>
        <li>Techniki wielokolorowe</li>
        <li>Kolorowe ombre</li>
        <li>Przestrzenne efekty kolorystyczne</li>
        <li>Indywidualne projekty kolorystyczne</li>
      </ul>
      <p>W przypadku intensywnych kolorów może być konieczne wcześniejsze rozjaśnienie włosów.</p>
      <p>Przed zabiegiem zalecamy konsultację w celu oceny stanu włosów i możliwości osiągnięcia pożądanego efektu.</p>
      <p>Czas trwania: 180-240 minut w zależności od złożoności projektu.</p>
    `,
    price: 'od 200 zł',
    image: 'https://pixabay.com/get/g12b8c048f60a67c365fab2506963b388872687be0e8eaa48be9d9b6a59956dbd42cc86332b68146d85437777fbefa2124d99f6f28d456873f8e356a6e19da7e3_1280.jpg'
  }
];
