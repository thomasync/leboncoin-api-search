/*

	ENUMS

*/

export enum SORT_BY {
	TIME = 'date',
	PRICE = 'price',
	RELEVANCE = 'relevance',
}

export enum SORT_ORDER {
	ASC = 'asc',
	DESC = 'desc',
}
export enum CATEGORY {
	ALL = '0',
	VEHICULES = '1',
	VOITURES = '2',
	MOTOS = '3',
	CARAVANING = '4',
	UTILITAIRES = '5',
	EQUIPEMENT_AUTO = '6',
	NAUTISME = '7',
	IMMOBILIER = '8',
	VENTES_IMMOBILIERES = '9',
	LOCATIONS = '10',
	COLOCATIONS = '11',
	LOCATIONS_SAISONNIERES = '12',
	BUREAUX_COMMERCES = '13',
	ORDINATEURS = '15',
	PHOTO_AUDIO_VIDEO = '16',
	TELEPHONES_OBJETS_CONNECTES = '17',
	AMEUBLEMENT = '19',
	ELECTROMENAGER = '20',
	BRICOLAGE = '21',
	VETEMENTS = '22',
	EQUIPEMENT_BEBE = '23',
	DVD_FILMS = '25',
	CD_MUSIQUE = '26',
	LIVRES = '27',
	ANIMAUX = '28',
	SPORT_PLEIN_AIR = '29',
	INSTRUMENTS_DE_MUSIQUE = '30',
	EQUIPEMENTS_INDUSTRIELS = '32',
	OFFRES_EMPLOI = '33',
	AUTRES_SERVICES = '34',
	BILLETTERIE = '35',
	COURS_PARTICULIERS = '36',
	AUTRES = '38',
	DECORATION = '39',
	COLLECTION = '40',
	JEUX_JOUETS = '41',
	MONTRES_BIJOUX = '42',
	CONSOLES = '43',
	EQUIPEMENT_MOTO = '44',
	ARTS_DE_LA_TABLE = '45',
	LINGE_DE_MAISON = '46',
	ACCESSOIRES_BAGAGERIE = '47',
	VINS_GASTRONOMIE = '48',
	EVENEMENTS = '49',
	EQUIPEMENT_CARAVANING = '50',
	EQUIPEMENT_NAUTISME = '51',
	JARDIN_PLANTES = '52',
	CHAUSSURES = '53',
	VETEMENTS_BEBE = '54',
	VELOS = '55',
	MATERIEL_AGRICOLE = '57',
	MANUTENTION_LEVAGE = '58',
	BTP_CHANTIER_GROS_OEUVRE = '59',
	EQUIPEMENTS_POUR_RESTAURANTS_HOTELS = '61',
	EQUIPEMENTS_FOURNITURES_DE_BUREAU = '62',
	EQUIPEMENTS_POUR_COMMERCES_MARCHES = '63',
	MATERIEL_MEDICAL = '64',
	COVOITURAGE = '65',
	HOTELS = '69',
	FORMATIONS_PROFESSIONNELLES = '74',
	ACCESSOIRES_ANIMAUX = '76',
	ANIMAUX_PERDUS = '77',
	MOBILIER_ENFANT = '80',
	ACCESSOIRES_TELEPHONE_OBJETS_CONNECTES = '81',
	TABLETTES_LISEUSES = '82',
	ACCESSOIRES_INFORMATIQUE = '83',
	JEUX_VIDEO = '84',
	EQUIPEMENTS_VELOS = '85',
	MODELISME = '86',
	LOISIRS_CREATIFS = '88',
	ANTIQUITES = '89',
	SERVICES_DE_DEMENAGEMENT = '92',
	SERVICES_DE_REPARATIONS_MECANIQUES = '93',
	SERVICES_DE_REPARATIONS_ELECTRONIQUES = '95',
	PAPETERIE_FOURNITURES_SCOLAIRES = '96',
	SERVICES_DE_JARDINERIE_BRICOLAGE = '97',
	SERVICES_EVENEMENTIELS = '98',
	SERVICES_A_LA_PERSONNE = '99',
	BABY_SITTING = '100',
	ARTISTES_MUSICIENS = '101',
	SERVICES_AUX_ANIMAUX = '102',
	ENTRAIDE_ENTRE_VOISINS = '103',
	TRACTEURS = '105',
	POIDS_LOURDS = '106',
	VENTES_FLASH_VACANCES = '301',
	LOCATIONS_EN_ESPAGNE = '302',
	DONS = '1000',
	VETEMENTS_ENFANTS = '1011',
	VETEMENTS_MATERNITE = '1012',
	CHAUSSURES_ENFANTS = '1013',
	MONTRES_BIJOUX_ENFANTS = '1014',
	ACCESSOIRES_BAGAGERIE_ENFANTS = '1015',
}

export enum OWNER_TYPE {
	ALL = 'all',
	PRO = 'pro',
	PRIVATE = 'private',
}

export enum ATTRIBUTES_BASE {
	RATING_SCORE = 'rating_score',
	RATING_COUNT = 'rating_count',
	PROFILE_PICTURE = 'profile_picture_url',
}

export enum ATTRIBUTES_VEHICLE {
	BRAND = 'brand',
	MODEL = 'model',
	U_CAR_BRAND = 'u_car_brand',
	U_CAR_MODEL = 'u_car_model',
	MODEL_DATE = 'regdate', // Année modèle
	ISSUANCE_DATE = 'issuance_date', // Date de mise en circulation
	MILEAGE = 'mileage', // Kilométrage
	FUEL = 'fuel', // Carburant
	GEARBOX = 'gearbox', // Boîte de vitesse
	TYPE = 'vehicle_type',
	COLOR = 'vehicle_color',
	DOORS = 'doors',
	SEATS = 'seats',
	POWER = 'horsepower',
	POWER_DIN = 'horse_power_din',
	VSP = 'vehicle_vsp',
	WARRANTY_TYPE = 'ad_warranty_type', // Garantie
	IS_IMPORT = 'is_import',
	OLD_PRICE = 'old_price',
	IS_ELIGIBLE_SECURE_PAYMENT = 'vehicle_is_eligible_p2p',
	PRICE_MIN = 'car_price_min',
	PRICE_MAX = 'car_price_max',
	WEIGHT = 'gross_vehicle_weight',
}

/*

	INTERFACES

*/

export interface Location {
	locationType: string;
	label?: string;
	city?: string;
	zipcode?: string;
	department_id?: string;
	region_id?: string;
	area?: {
		lat: number;
		lng: number;
		default_radius: number;
	};
}

export interface Feature {
	param: string;
	label: string;
	apiType: string;
	values: { type: string; simpleData?: any };
}

export interface FlatCategory {
	id: string;
	name: string;
	parent: FlatCategory | null;
}

export interface Category {
	id: string;
	name: string;
	subcategories?: Category[];
}

export interface AccountLoginResultError {
	error: string;
	error_description: string;
	status_code: number;
	error_debug: string;
}

export interface AccountLoginResultSuccess {
	redirect_uri: string;
	login_status: string;
}

export interface SimilarResult<T = undefined> {
	similar_model_version: string;
	referer_type: string;
	referer_id: string;
	ads: Result<T>[];
}

export interface Search {
	keywords?: string;
	only_title?: boolean;
	shippable?: boolean;
	locations?: number[] | string[];
	category?: string;
	limit?: number;
	offset?: number;
	pivot?: string;
	owner_type?: OWNER_TYPE;
	sort_by?: SORT_BY;
	sort_order?: SORT_ORDER;
	price_min?: number;
	price_max?: number;
	ranges?: any;
	enums?: any;
}

export interface SearchFilters {
	filters: {
		category?: { id: string };
		enums?: any;
		ranges?: any;
		keywords?: { text: string; type: string };
		location: {
			locations?: Location[];
			shippable: boolean;
		};
	};
	limit: number;
	owner_type: OWNER_TYPE;
	sort_by: SORT_BY;
	sort_order: SORT_ORDER;
	offset?: number;
	pivot?: string;
}

export interface SearchResult<T = undefined> {
	total: number;
	total_all: number;
	total_pro: number;
	total_private: number;
	max_pages: number;
	referrer_id: string;
	human_readable_applied_condition: string;
	pivot?: string;
	ads: Result<T>[];
}

export type ResultAttributes<T> = ATTRIBUTES_BASE & T;

export interface Result<T> {
	list_id: number;
	first_publication_date: string;
	expiration_date: string;
	index_date: string;
	status: string;
	category_id: string;
	category_name: string;
	subject: string;
	body: string;
	brand: string;
	ad_type: string;
	url: string;
	price: number[];
	price_cents: number;
	images: {
		thumb_url: string;
		small_url: string;
		nb_images: number;
		urls: string[];
		urls_thumb: string[];
		urls_large: string[];
	};
	attributes: {
		key: ResultAttributes<T>;
		value: string;
		values: string[];
		value_label: string;
		generic: boolean;
	}[];
	location: {
		country_id: string;
		region_id: string;
		region_name: string;
		department_id: string;
		department_name: string;
		city_label: string;
		city: string;
		zipcode: string;
		lat: number;
		lng: number;
		source: string;
		provider: string;
		is_shape: boolean;
		feature: {
			[feature: string]: boolean;
		};
		owner: {
			store_id: string;
			user_id: string;
			type: OWNER_TYPE;
			name: string;
			siren: string;
			no_salesmen: boolean;
			activity_sector: string;
		};
		options: {
			has_option: boolean;
			booster: boolean;
			photosup: boolean;
			urgent: boolean;
			gallery: boolean;
			sub_toplist: boolean;
			continuous_top_ads: boolean;
		};
		has_phone: boolean;
		is_boosted: boolean;
		similar: any;
	};
}

export interface ResultMultiples {
	ads: Result<undefined>[];
	pivot: string;
	total: number;
}

export interface User {
	name: string;
	registered_at: string;
	location: string;
	reply: {
		in_minutes: number;
		text: string;
	};
	profile_picture: {
		is_default: boolean;
		default: boolean;
		small_url: string;
		medium_url: string;
		large_url: string;
		extra_large_url: string;
	};
	badges: {
		type: string;
		name: string;
	}[];
	total_ads: number;
	feedback: UserFeedback;
	presence: UserPresence;
}

export interface UserPresence {
	status: string;
	precenceText: string;
	lastActivity: string;
	enabled: boolean;
}

export interface UserFeedback {
	overallScore: number;
	categoryScores: {
		COMMUNICATION: number;
		PACKAGE: number;
		PRODUCT: number;
		RECOMMENDATION: number;
		USER_ATTENTION: number;
	};
	sourceScores: {
		MEMBER: number;
		AUTOMATIC: number;
	};
	sourceCounts: {
		MEMBER: number;
		AUTOMATIC: number;
	};
	receivedCount: number;
	sellerFeedbackCount: number;
	buyerFeedbackCount: number;
}

export interface Presence {
	reputation: {
		feedback: UserFeedback;
	};
	presence: UserPresence;
}
