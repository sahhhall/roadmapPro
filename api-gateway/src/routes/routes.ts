require('dotenv').config();

export const ROUTES = [
    {
        url: '/api/user/notifications',
        auth: 'user',
        proxy: {
            target: `${process.env.NOTIFICATION_SERVICE_URL}/api/user/notifications`,
            changeOrigin: true,
        }
    },
    {
        url: '/api/admin/assessment',
        auth: 'admin',
        proxy: {
            target: `${process.env.ASSESSMENT_SERVICE_URL}/api/admin/assessment`,
            changeOrigin: true,
        }
    },
    {
        url: '/api/admin/roadmap',
        auth: "admin",
        proxy: {
            target: `${process.env.ROADMAP_SERVICE_URL}/api/admin/roadmap`,
            changeOrigin: true,
        }
    },
    {
        url: '/api/auth/',
        auth: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,  
            max: 10  //  per 15 minutes per IP
        },
        proxy: {
            target: `${process.env.AUTH_SERVICE_URL}/api/auth`,
            changeOrigin: true,
        }
    },
    {
        url: '/api/auth/logout',
        auth: "user",
        proxy: {
            target: `${process.env.AUTH_SERVICE_URL}/api/auth`,
            changeOrigin: true,
        }
    },
    {
        url: '/api/admin/users',
        auth: "admin",
        proxy: {
            target: `${process.env.AUTH_SERVICE_URL}/api/admin/users`,
            changeOrigin: true,
        }
    },
    {
        url: '/api/admin/logout',
        auth: "admin",
        proxy: {
            target: `${process.env.AUTH_SERVICE_URL}/api/admin/logout`,
            changeOrigin: true,
        }
    },
    {
        url: '/api/admin/user-action',
        auth: "admin",
        proxy: {
            target: `${process.env.AUTH_SERVICE_URL}/api/admin/user-action`,
            changeOrigin: true
        }
    },
    {
        url: '/api/admin/',
        auth: false,
        proxy: {
            target: `${process.env.AUTH_SERVICE_URL}/api/admin`,
            changeOrigin: true,
        }
    },
    {
        url: '/api/roadmap/nodedetails',
        auth: false,
        proxy: {
            target: `${process.env.ROADMAP_SERVICE_URL}/api/roadmap/nodedetails`,
            changeOrigin: true,
        }
    },
    {
        url: '/api/roadmap/published',
        auth: false,
        proxy: {
            target: `${process.env.ROADMAP_SERVICE_URL}/api/roadmap/published`,
            changeOrigin: true,
        }
    },
    {
        url: '/api/roadmap',
        auth: 'user',
        proxy: {
            target: `${process.env.ROADMAP_SERVICE_URL}/api/roadmap`,
            changeOrigin: true,
        }
    },
    {
        url: '/api/assessment',
        auth: 'user',
        proxy: {
            target: `${process.env.ASSESSMENT_SERVICE_URL}/api/assessment`,
            changeOrigin: true,
        }
    },
    {
        url: '/api/mentors',
        auth: false,
        proxy: {
            target: `${process.env.MENTOR_SERVICE_URL}/api/mentors`,
            changeOrigin: true,
        }
    },
    {
        url: '/api/mentor',
        auth: false,
        proxy: {
            target: `${process.env.USER_SERVICE_URL}/api/mentor`,
            changeOrigin: true,
        }
    },
    {
        url: '/api/user',
        auth: false,
        proxy: {
            target: `${process.env.USER_SERVICE_URL}/api/user`,
            changeOrigin: true,
        }
    },
    {
        url: '/api/bookings',
        auth: false,
        proxy: {
            target: `${process.env.MENTOR_SERVICE_URL}/api/bookings`,
            changeOrigin: true,
        }
    },
    {
        url: '/api/payments',
        auth: false,
        proxy: {
            target: `${process.env.PAYMENT_SERVICE_URL}/api/payments`,
            changeOrigin: true,
        }
    },
    {
        url: '/api/bookings/analytics',
        auth: 'admin',
        proxy: {
            target: `${process.env.MENTOR_SERVICE_URL}/api/bookings/analytics`,
            changeOrigin: true,
        }
    }
];