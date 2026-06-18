// ── Jerarquía geográfica: Continente → País → Estado → Ciudades ────────────────

export type LocationData = {
    [continent: string]: {
        [country: string]: {
            [state: string]: string[]
        }
    }
}

export const locationData: LocationData = {
    "América del Sur": {
        "Argentina": {
            "Buenos Aires": ["Buenos Aires", "La Plata", "Mar del Plata", "Quilmes", "Lanús"],
            "Córdoba": ["Córdoba", "Villa María", "Río Cuarto", "San Francisco"],
            "Santa Fe": ["Rosario", "Santa Fe", "Rafaela", "Venado Tuerto"],
            "Mendoza": ["Mendoza", "San Rafael", "Godoy Cruz", "Luján de Cuyo"],
            "Tucumán": ["San Miguel de Tucumán", "Tafí Viejo", "Banda del Río Salí"],
            "Salta": ["Salta", "San Ramón de la Nueva Orán", "Tartagal"],
            "Misiones": ["Posadas", "Oberá", "Eldorado", "Puerto Iguazú"],
        },
        "Brasil": {
            "São Paulo": ["São Paulo", "Campinas", "Santos", "Ribeirão Preto", "Guarulhos"],
            "Río de Janeiro": ["Río de Janeiro", "Niterói", "Petrópolis", "Nova Iguaçu"],
            "Minas Gerais": ["Belo Horizonte", "Uberlândia", "Juiz de Fora", "Contagem"],
            "Bahia": ["Salvador", "Feira de Santana", "Vitória da Conquista"],
            "Paraná": ["Curitiba", "Londrina", "Maringá", "Foz do Iguaçu"],
            "Rio Grande do Sul": ["Porto Alegre", "Caxias do Sul", "Pelotas"],
        },
        "Colombia": {
            "Cundinamarca": ["Bogotá", "Soacha", "Facatativá", "Zipaquirá"],
            "Antioquia": ["Medellín", "Bello", "Itagüí", "Envigado"],
            "Valle del Cauca": ["Cali", "Buenaventura", "Palmira", "Tuluá"],
            "Atlántico": ["Barranquilla", "Soledad", "Malambo"],
            "Santander": ["Bucaramanga", "Floridablanca", "Girón"],
        },
        "Chile": {
            "Región Metropolitana": ["Santiago", "Puente Alto", "Maipú", "La Florida"],
            "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"],
            "Biobío": ["Concepción", "Talcahuano", "Chillán", "Los Ángeles"],
            "La Araucanía": ["Temuco", "Padre Las Casas", "Villarrica"],
            "Los Lagos": ["Puerto Montt", "Osorno", "Castro"],
        },
        "Perú": {
            "Lima": ["Lima", "Callao", "San Juan de Lurigancho", "Ate"],
            "Arequipa": ["Arequipa", "Cayma", "Cerro Colorado", "Paucarpata"],
            "La Libertad": ["Trujillo", "Víctor Larco Herrera", "El Porvenir"],
            "Piura": ["Piura", "Sullana", "Talara", "Paita"],
        },
        "Venezuela": {
            "Distrito Capital": ["Caracas", "Petare", "El Hatillo"],
            "Miranda": ["Los Teques", "Guarenas", "Guatire", "Baruta"],
            "Zulia": ["Maracaibo", "San Francisco", "Cabimas"],
            "Carabobo": ["Valencia", "Guacara", "San Diego"],
        },
        "Bolivia": {
            "La Paz": ["La Paz", "El Alto", "Viacha", "Achacachi"],
            "Santa Cruz": ["Santa Cruz de la Sierra", "Montero", "Warnes"],
            "Cochabamba": ["Cochabamba", "Sacaba", "Quillacollo"],
        },
        "Paraguay": {
            "Central": ["Asunción", "San Lorenzo", "Luque", "Capiatá"],
            "Alto Paraná": ["Ciudad del Este", "Presidente Franco", "Hernandarias"],
            "Itapúa": ["Encarnación", "Coronel Bogado", "Hohenau"],
        },
        "Uruguay": {
            "Montevideo": ["Montevideo", "Las Piedras", "La Paz"],
            "Canelones": ["Canelones", "Ciudad de la Costa", "Pando"],
            "Maldonado": ["Maldonado", "Punta del Este", "San Carlos"],
        },
        "Ecuador": {
            "Pichincha": ["Quito", "Sangolquí", "Cayambe"],
            "Guayas": ["Guayaquil", "Samborondón", "Durán", "Milagro"],
            "Azuay": ["Cuenca", "Girón", "Gualaceo"],
        },
    },
    "América del Norte": {
        "México": {
            "Ciudad de México": ["Ciudad de México", "Iztapalapa", "Gustavo A. Madero"],
            "Jalisco": ["Guadalajara", "Zapopan", "Tlaquepaque", "Tonalá"],
            "Nuevo León": ["Monterrey", "San Nicolás de los Garza", "Guadalupe"],
            "Estado de México": ["Ecatepec", "Naucalpan", "Toluca", "Nezahualcóyotl"],
            "Puebla": ["Puebla", "Tehuacán", "San Andrés Cholula"],
            "Guanajuato": ["León", "Irapuato", "Celaya", "Salamanca"],
            "Veracruz": ["Veracruz", "Xalapa", "Coatzacoalcos", "Córdoba"],
        },
        "Estados Unidos": {
            "California": ["Los Ángeles", "San Francisco", "San Diego", "San José"],
            "Texas": ["Houston", "San Antonio", "Dallas", "Austin"],
            "Florida": ["Miami", "Orlando", "Tampa", "Jacksonville"],
            "New York": ["Nueva York", "Buffalo", "Rochester", "Yonkers"],
            "Illinois": ["Chicago", "Aurora", "Naperville", "Rockford"],
        },
        "Canadá": {
            "Ontario": ["Toronto", "Ottawa", "Mississauga", "Brampton"],
            "Quebec": ["Montreal", "Quebec City", "Laval", "Gatineau"],
            "Columbia Británica": ["Vancouver", "Surrey", "Burnaby", "Richmond"],
            "Alberta": ["Calgary", "Edmonton", "Red Deer", "Lethbridge"],
        },
    },
    "América Central y Caribe": {
        "Guatemala": {
            "Guatemala": ["Ciudad de Guatemala", "Mixco", "Villa Nueva"],
            "Quetzaltenango": ["Quetzaltenango", "Coatepeque"],
        },
        "Costa Rica": {
            "San José": ["San José", "Alajuelita", "Desamparados"],
            "Alajuela": ["Alajuela", "San Carlos", "Palmares"],
        },
        "Panamá": {
            "Panamá": ["Ciudad de Panamá", "San Miguelito", "Arraiján"],
            "Colón": ["Colón", "Portobelo", "La Pintada"],
        },
        "Cuba": {
            "La Habana": ["La Habana", "Santiago de las Vegas", "Guanabacoa"],
            "Santiago de Cuba": ["Santiago de Cuba", "Palma Soriano"],
        },
        "República Dominicana": {
            "Distrito Nacional": ["Santo Domingo", "Santo Domingo Este", "Santo Domingo Norte"],
            "Santiago": ["Santiago de los Caballeros", "Villa Bisonó"],
        },
    },
    "Europa": {
        "España": {
            "Madrid": ["Madrid", "Alcalá de Henares", "Leganés", "Getafe"],
            "Cataluña": ["Barcelona", "L'Hospitalet de Llobregat", "Badalona", "Terrassa"],
            "Andalucía": ["Sevilla", "Málaga", "Granada", "Córdoba"],
            "Valencia": ["Valencia", "Alicante", "Elche", "Castellón de la Plana"],
        },
        "Alemania": {
            "Baviera": ["Múnich", "Núremberg", "Augsburgo"],
            "Berlín": ["Berlín"],
            "Hamburgo": ["Hamburgo"],
            "Renania del Norte-Westfalia": ["Colonia", "Düsseldorf", "Dortmund", "Essen"],
        },
        "Francia": {
            "Île-de-France": ["París", "Boulogne-Billancourt", "Saint-Denis"],
            "Provenza-Alpes-Costa Azul": ["Marsella", "Niza", "Toulon"],
            "Auvernia-Ródano-Alpes": ["Lyon", "Grenoble", "Saint-Étienne"],
        },
        "Italia": {
            "Lacio": ["Roma", "Latina", "Frosinone"],
            "Lombardía": ["Milán", "Brescia", "Bergamo", "Monza"],
            "Véneto": ["Venecia", "Verona", "Padua", "Vicenza"],
        },
        "Reino Unido": {
            "Inglaterra": ["Londres", "Birmingham", "Manchester", "Leeds"],
            "Escocia": ["Glasgow", "Edimburgo", "Aberdeen"],
            "Gales": ["Cardiff", "Swansea", "Newport"],
        },
        "Portugal": {
            "Lisboa": ["Lisboa", "Amadora", "Sintra", "Loures"],
            "Porto": ["Porto", "Vila Nova de Gaia", "Matosinhos"],
            "Algarve": ["Faro", "Loulé", "Portimão"],
        },
    },
    "Asia": {
        "India": {
            "Maharashtra": ["Bombay", "Pune", "Nagpur", "Thane"],
            "Delhi": ["Nueva Delhi", "Delhi", "Noida"],
            "Karnataka": ["Bangalore", "Mysore", "Hubli"],
            "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
        },
        "China": {
            "Guangdong": ["Guangzhou", "Shenzhen", "Dongguan", "Foshan"],
            "Shanghái": ["Shanghái", "Minhang", "Baoshan"],
            "Beijing": ["Beijing", "Chaoyang", "Haidian"],
        },
        "Japón": {
            "Tokio": ["Tokio", "Hachioji", "Tachikawa"],
            "Osaka": ["Osaka", "Sakai", "Higashiosaka"],
            "Kanagawa": ["Yokohama", "Kawasaki", "Sagamihara"],
        },
    },
    "África": {
        "Nigeria": {
            "Lagos": ["Lagos", "Ikeja", "Surulere"],
            "Kano": ["Kano", "Fagge", "Dala"],
            "Abuja": ["Abuja", "Garki", "Wuse"],
        },
        "Sudáfrica": {
            "Gauteng": ["Johannesburgo", "Pretoria", "Soweto"],
            "Western Cape": ["Ciudad del Cabo", "Stellenbosch", "George"],
            "KwaZulu-Natal": ["Durban", "Pietermaritzburg", "Newcastle"],
        },
    },
    "Oceanía": {
        "Australia": {
            "Nueva Gales del Sur": ["Sídney", "Newcastle", "Wollongong", "Parramatta"],
            "Victoria": ["Melbourne", "Geelong", "Ballarat", "Bendigo"],
            "Queensland": ["Brisbane", "Gold Coast", "Sunshine Coast"],
            "Australia Occidental": ["Perth", "Mandurah", "Joondalup"],
        },
        "Nueva Zelanda": {
            "Auckland": ["Auckland", "Manukau", "North Shore"],
            "Wellington": ["Wellington", "Lower Hutt", "Porirua"],
            "Canterbury": ["Christchurch", "Selwyn", "Waimakariri"],
        },
    },
}

// ── Helpers ────────────────────────────────────────────────────────────────────

export const getContinents = (): string[] => Object.keys(locationData)

export const getCountries = (continent: string): string[] =>
    continent ? Object.keys(locationData[continent] ?? {}) : []

export const getStates = (continent: string, country: string): string[] =>
    continent && country
        ? Object.keys(locationData[continent]?.[country] ?? {})
        : []

export const getCities = (continent: string, country: string, state: string): string[] =>
    continent && country && state
        ? locationData[continent]?.[country]?.[state] ?? []
        : []
