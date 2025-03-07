
export enum EntityList {
	User = 'user',
	Feedback = 'feedback',
	Training = 'training',
	Order = 'order'
}

export const EntityConstrain = {
	[EntityList.User]: {
		name: {
			required: true,
			minLength: 1,
			maxLength: 15
		},
		email: {
			required: true,
		},
		avatar: {
			required: false,
			imageTypes: ['.jpg', '.jpeg', '.png'],
			maxFileSize: 1024000
		},
		password: {
			required: true,
			minLength: 6,
			maxLength: 12
		},
		sex: {
			required: true,
		},
		birthDate: {
			required: false,
		},
		description: {
			required: false,
			minLength: 10,
			maxLength: 140
		},
		location: {
			required: true,
		},
		backgroundImage: {
			required: true,
			mimeTypes: ['.jpg', '.jpeg', '.png'],
		}
	},
	[EntityList.Feedback]: {
		mark: {
			required: true,
			minValue: 1,
			maxValue: 5
		},
		comment: {
			required: true,
			minLength: 100,
			maxLength: 1024
		},
	},
	[EntityList.Training]: {
		name: {
			required: true,
			minLength: 1,
			maxLength: 15
		},
		backgroundImage: {
			required: true,
			mimeTypes: ['.jpg', '.jpeg', '.png'],
		},
		calories: {
			required: true,
			minValue: 1000,
			maxValue: 5000
		},
		description: {
			required: true,
			minLength: 10,
			maxLength: 140
		},
		video: {
			required: true,
			mimeTypes: ['.mov', '.avi', '.mp4'],
		},
		trainerName: {
			required: true,
			minLength: 1,
			maxLength: 15
		}
	},
	[EntityList.Order]: {
		amount: {
			required: true,
			minValue: 1,
			maxValue: 50
		}
	}
} as const

export enum UserGender {
	Man = 'мужской',
	Female = 'женский',
	NotAvailable = 'неважно',
}

export enum TrainingGender {
	Man = 'для мужчин',
	Female = 'для женщин',
	All = 'для всех',
}

export enum TrainingLevel {
	Beginner = 'новичок',
	Amateur = 'любитель',
	Professional = 'профессионал'
}

export const TRAINING_TYPES = ['йога', 'бег', 'бокс', 'стрейчинг', 'кроссфит', 'аэробика', 'пилатес'] as const

export const LOCATIONS = ['Пионерская', 'Петроградская', 'Удельная', 'Звёздная', 'Спортивная'] as const

export const TRAINING_DURATIONS = ['10-30 мин', '30-50 мин', '50-80 мин', '80-100 мин'] as const

export const ORDER_TYPES = ['абонемент'] as const

export const PAY_TYPES = ['visa', 'mir', 'umoney'] as const

export enum AppRoute {
	Root = '/',
	Login = '/login',
	Register = '/register',
	Favorites = '/favorites',
	Property = '/offer',
	Add = '/add',
	Edit = '/edit',
	NotFound = '/404',
}

export enum ApiRoute {
	Offers = '/offers',
	Login = '/login',
	Logout = '/logout',
	Register = '/register',
	Avatar = '/avatar',
	Comments = '/comments',
	Favorite = '/favorites',
	Premium = '/premium',
}

export enum AuthorizationStatus {
	Auth = 'AUTH',
	NoAuth = 'NO_AUTH',
	Unknown = 'UNKNOWN',
}

export enum Sorting {
	Popular = 'Popular',
	PriceIncrease = 'Price: low to high',
	PriceDecrease = 'Price: high to low',
	TopRated = 'Top rated first',
}

export enum UserRole {
	User = 'user',
	Trainer = 'trainer',
}

