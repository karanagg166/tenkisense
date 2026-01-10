// Comprehensive location database for Japan and India
import { LocationInfo } from "@/types";

export type { LocationInfo };

// Japan Cities with Districts
export const JAPAN_LOCATIONS: LocationInfo[] = [
    {
        city: "Tokyo",
        country: "Japan",
        countryCode: "JP",
        aliases: ["tokyo", "東京", "とうきょう"],
        districts: [
            "Shibuya", "Shinjuku", "Harajuku", "Ginza", "Asakusa", "Akihabara",
            "Roppongi", "Ikebukuro", "Ueno", "Odaiba", "Nakano", "Shimokitazawa",
            "Ebisu", "Meguro", "Gotanda", "Shinagawa", "Nihonbashi", "Marunouchi",
            "Yurakucho", "Kanda", "Ochanomizu", "Ryogoku", "Tsukiji", "Tsukishima"
        ]
    },
    {
        city: "Osaka",
        country: "Japan",
        countryCode: "JP",
        aliases: ["osaka", "大阪", "おおさか"],
        districts: ["Namba", "Umeda", "Shinsaibashi", "Dotonbori", "Tennoji", "Shinsekai"]
    },
    {
        city: "Kyoto",
        country: "Japan",
        countryCode: "JP",
        aliases: ["kyoto", "京都", "きょうと"],
        districts: ["Gion", "Arashiyama", "Fushimi", "Higashiyama", "Kiyomizu"]
    },
    { city: "Yokohama", country: "Japan", countryCode: "JP", aliases: ["yokohama", "横浜"], districts: ["Minato Mirai", "Chinatown", "Kannai"] },
    { city: "Nagoya", country: "Japan", countryCode: "JP", aliases: ["nagoya", "名古屋"], districts: ["Sakae", "Osu"] },
    { city: "Sapporo", country: "Japan", countryCode: "JP", aliases: ["sapporo", "札幌"], districts: ["Susukino", "Odori"] },
    { city: "Fukuoka", country: "Japan", countryCode: "JP", aliases: ["fukuoka", "福岡"], districts: ["Hakata", "Tenjin", "Nakasu"] },
    { city: "Kobe", country: "Japan", countryCode: "JP", aliases: ["kobe", "神戸"], districts: ["Sannomiya", "Kitano"] },
    { city: "Hiroshima", country: "Japan", countryCode: "JP", aliases: ["hiroshima", "広島"] },
    { city: "Sendai", country: "Japan", countryCode: "JP", aliases: ["sendai", "仙台"] },
    { city: "Nara", country: "Japan", countryCode: "JP", aliases: ["nara", "奈良"] },
    { city: "Kanazawa", country: "Japan", countryCode: "JP", aliases: ["kanazawa", "金沢"] },
    { city: "Okinawa", country: "Japan", countryCode: "JP", aliases: ["okinawa", "沖縄", "naha", "那覇"] },
    { city: "Nikko", country: "Japan", countryCode: "JP", aliases: ["nikko", "日光"] },
    { city: "Hakone", country: "Japan", countryCode: "JP", aliases: ["hakone", "箱根"] },
    { city: "Kamakura", country: "Japan", countryCode: "JP", aliases: ["kamakura", "鎌倉"] },
    { city: "Nagasaki", country: "Japan", countryCode: "JP", aliases: ["nagasaki", "長崎"] },
    { city: "Takayama", country: "Japan", countryCode: "JP", aliases: ["takayama", "高山"] },
    { city: "Matsumoto", country: "Japan", countryCode: "JP", aliases: ["matsumoto", "松本"] },
    { city: "Kumamoto", country: "Japan", countryCode: "JP", aliases: ["kumamoto", "熊本"] },
];

// India Cities with Districts
export const INDIA_LOCATIONS: LocationInfo[] = [
    {
        city: "Delhi",
        country: "India",
        countryCode: "IN",
        aliases: ["delhi", "new delhi", "दिल्ली"],
        districts: ["Connaught Place", "Chandni Chowk", "Hauz Khas", "Karol Bagh", "Saket", "Dwarka", "Noida", "Gurgaon", "Gurugram"]
    },
    {
        city: "Mumbai",
        country: "India",
        countryCode: "IN",
        aliases: ["mumbai", "bombay", "मुंबई"],
        districts: ["Bandra", "Juhu", "Colaba", "Andheri", "Powai", "Worli", "Lower Parel", "Marine Drive", "Dadar"]
    },
    {
        city: "Bangalore",
        country: "India",
        countryCode: "IN",
        aliases: ["bangalore", "bengaluru", "बेंगलुरु"],
        districts: ["Koramangala", "Indiranagar", "MG Road", "Whitefield", "Electronic City", "Jayanagar", "HSR Layout"]
    },
    {
        city: "Chennai",
        country: "India",
        countryCode: "IN",
        aliases: ["chennai", "madras", "चेन्नई"],
        districts: ["T Nagar", "Anna Nagar", "Mylapore", "Adyar", "OMR", "Marina Beach"]
    },
    {
        city: "Kolkata",
        country: "India",
        countryCode: "IN",
        aliases: ["kolkata", "calcutta", "कोलकाता"],
        districts: ["Park Street", "Salt Lake", "Howrah", "New Town", "Esplanade"]
    },
    { city: "Hyderabad", country: "India", countryCode: "IN", aliases: ["hyderabad", "हैदराबाद"], districts: ["Banjara Hills", "Jubilee Hills", "Hitech City", "Charminar"] },
    { city: "Pune", country: "India", countryCode: "IN", aliases: ["pune", "पुणे"], districts: ["Koregaon Park", "Hinjewadi", "Kothrud"] },
    { city: "Ahmedabad", country: "India", countryCode: "IN", aliases: ["ahmedabad", "अहमदाबाद"] },
    { city: "Jaipur", country: "India", countryCode: "IN", aliases: ["jaipur", "जयपुर", "pink city"] },
    { city: "Lucknow", country: "India", countryCode: "IN", aliases: ["lucknow", "लखनऊ"] },
    { city: "Chandigarh", country: "India", countryCode: "IN", aliases: ["chandigarh", "चंडीगढ़"] },
    { city: "Surat", country: "India", countryCode: "IN", aliases: ["surat", "सूरत"] },
    { city: "Indore", country: "India", countryCode: "IN", aliases: ["indore", "इंदौर"] },
    { city: "Bhopal", country: "India", countryCode: "IN", aliases: ["bhopal", "भोपाल"] },
    { city: "Jabalpur", country: "India", countryCode: "IN", aliases: ["jabalpur", "जबलपुर"] },
    { city: "Nagpur", country: "India", countryCode: "IN", aliases: ["nagpur", "नागपुर"] },
    { city: "Coimbatore", country: "India", countryCode: "IN", aliases: ["coimbatore", "kovai"] },
    { city: "Kochi", country: "India", countryCode: "IN", aliases: ["kochi", "cochin", "कोच्चि"] },
    { city: "Thiruvananthapuram", country: "India", countryCode: "IN", aliases: ["thiruvananthapuram", "trivandrum"] },
    { city: "Visakhapatnam", country: "India", countryCode: "IN", aliases: ["visakhapatnam", "vizag", "vishakhapatnam"] },
    { city: "Varanasi", country: "India", countryCode: "IN", aliases: ["varanasi", "banaras", "kashi", "वाराणसी"] },
    { city: "Agra", country: "India", countryCode: "IN", aliases: ["agra", "आगरा", "taj mahal"] },
    { city: "Amritsar", country: "India", countryCode: "IN", aliases: ["amritsar", "अमृतसर"] },
    { city: "Goa", country: "India", countryCode: "IN", aliases: ["goa", "पणजी", "panaji"] },
    { city: "Udaipur", country: "India", countryCode: "IN", aliases: ["udaipur", "उदयपुर", "city of lakes"] },
    { city: "Jodhpur", country: "India", countryCode: "IN", aliases: ["jodhpur", "जोधपुर", "blue city"] },
    { city: "Shimla", country: "India", countryCode: "IN", aliases: ["shimla", "शिमला"] },
    { city: "Manali", country: "India", countryCode: "IN", aliases: ["manali", "मनाली"] },
    { city: "Dharamshala", country: "India", countryCode: "IN", aliases: ["dharamshala", "dharamsala", "mcleodganj"] },
    { city: "Rishikesh", country: "India", countryCode: "IN", aliases: ["rishikesh", "ऋषिकेश"] },
    { city: "Haridwar", country: "India", countryCode: "IN", aliases: ["haridwar", "हरिद्वार"] },
    { city: "Dehradun", country: "India", countryCode: "IN", aliases: ["dehradun", "देहरादून"] },
    { city: "Mussoorie", country: "India", countryCode: "IN", aliases: ["mussoorie", "मसूरी"] },
    { city: "Nainital", country: "India", countryCode: "IN", aliases: ["nainital", "नैनीताल"] },
    { city: "Darjeeling", country: "India", countryCode: "IN", aliases: ["darjeeling", "दार्जिलिंग"] },
    { city: "Gangtok", country: "India", countryCode: "IN", aliases: ["gangtok", "गंगटोक"] },
    { city: "Shillong", country: "India", countryCode: "IN", aliases: ["shillong", "शिलांग"] },
    { city: "Guwahati", country: "India", countryCode: "IN", aliases: ["guwahati", "गुवाहाटी"] },
    { city: "Srinagar", country: "India", countryCode: "IN", aliases: ["srinagar", "श्रीनगर", "kashmir"] },
    { city: "Leh", country: "India", countryCode: "IN", aliases: ["leh", "ladakh", "लेह"] },
    { city: "Mysore", country: "India", countryCode: "IN", aliases: ["mysore", "mysuru", "मैसूर"] },
    { city: "Ooty", country: "India", countryCode: "IN", aliases: ["ooty", "ootacamund", "udhagamandalam"] },
    { city: "Kodaikanal", country: "India", countryCode: "IN", aliases: ["kodaikanal", "kodai"] },
    { city: "Pondicherry", country: "India", countryCode: "IN", aliases: ["pondicherry", "puducherry", "pondy"] },
    { city: "Madurai", country: "India", countryCode: "IN", aliases: ["madurai", "मदुरै"] },
    { city: "Thanjavur", country: "India", countryCode: "IN", aliases: ["thanjavur", "tanjore"] },
    { city: "Tirupati", country: "India", countryCode: "IN", aliases: ["tirupati", "तिरुपति"] },
    { city: "Vijayawada", country: "India", countryCode: "IN", aliases: ["vijayawada", "bezawada"] },
    { city: "Mangalore", country: "India", countryCode: "IN", aliases: ["mangalore", "mangaluru"] },
    { city: "Hubli", country: "India", countryCode: "IN", aliases: ["hubli", "hubballi"] },
    { city: "Belgaum", country: "India", countryCode: "IN", aliases: ["belgaum", "belagavi"] },
    { city: "Nashik", country: "India", countryCode: "IN", aliases: ["nashik", "nasik"] },
    { city: "Aurangabad", country: "India", countryCode: "IN", aliases: ["aurangabad", "sambhajinagar"] },
    { city: "Kolhapur", country: "India", countryCode: "IN", aliases: ["kolhapur"] },
    { city: "Solapur", country: "India", countryCode: "IN", aliases: ["solapur", "sholapur"] },
    { city: "Vadodara", country: "India", countryCode: "IN", aliases: ["vadodara", "baroda"] },
    { city: "Rajkot", country: "India", countryCode: "IN", aliases: ["rajkot"] },
    { city: "Bhavnagar", country: "India", countryCode: "IN", aliases: ["bhavnagar"] },
    { city: "Jamnagar", country: "India", countryCode: "IN", aliases: ["jamnagar"] },
    { city: "Raipur", country: "India", countryCode: "IN", aliases: ["raipur"] },
    { city: "Ranchi", country: "India", countryCode: "IN", aliases: ["ranchi"] },
    { city: "Patna", country: "India", countryCode: "IN", aliases: ["patna", "पटना"] },
    { city: "Bhubaneswar", country: "India", countryCode: "IN", aliases: ["bhubaneswar", "bhubaneshwar"] },
    { city: "Cuttack", country: "India", countryCode: "IN", aliases: ["cuttack"] },
    { city: "Puri", country: "India", countryCode: "IN", aliases: ["puri"] },
];

// All locations combined
export const ALL_LOCATIONS = [...JAPAN_LOCATIONS, ...INDIA_LOCATIONS];

// District to city mapping
const DISTRICT_MAP: Record<string, string> = {};
ALL_LOCATIONS.forEach(loc => {
    loc.districts?.forEach(district => {
        DISTRICT_MAP[district.toLowerCase()] = loc.city;
    });
});

/**
 * Extract location from user query
 * Returns city name for weather API
 */
export function extractLocation(text: string): { city: string; isDistrict: boolean; original: string } | null {
    const lowerText = text.toLowerCase();

    // Check for districts first (more specific)
    for (const [district, city] of Object.entries(DISTRICT_MAP)) {
        if (lowerText.includes(district)) {
            return { city, isDistrict: true, original: district };
        }
    }

    // Check for city names and aliases
    for (const loc of ALL_LOCATIONS) {
        // Check main city name
        if (lowerText.includes(loc.city.toLowerCase())) {
            return { city: loc.city, isDistrict: false, original: loc.city };
        }
        // Check aliases
        for (const alias of loc.aliases) {
            if (lowerText.includes(alias.toLowerCase())) {
                return { city: loc.city, isDistrict: false, original: alias };
            }
        }
    }

    // Pattern matching fallback for unrecognized locations
    const patterns = [
        /weather (?:in|of|for|at) ([a-zA-Z\s]+?)(?:\?|$|,|\.)/i,
        /(?:in|of|for|at) ([a-zA-Z\s]+?) (?:weather|temperature)/i,
        /visit(?:ing)? (?:to )?([a-zA-Z\s]+?)(?:\s+in|\?|$)/i,
        /clothes? (?:for|in|to) ([a-zA-Z\s]+)/i,
        /([a-zA-Z\s]+?) (?:weather|temperature|forecast)/i,
        /temperature (?:in|of|at) ([a-zA-Z\s]+)/i,
        /going to ([a-zA-Z\s]+)/i,
        /travel(?:ing)? to ([a-zA-Z\s]+)/i,
    ];

    for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match && match[1]) {
            const extracted = match[1].trim();
            if (extracted.length > 2 && extracted.length < 50) {
                return { city: extracted, isDistrict: false, original: extracted };
            }
        }
    }

    return null;
}

/**
 * Get location info by city name
 */
export function getLocationInfo(city: string): LocationInfo | null {
    const lowerCity = city.toLowerCase();
    return ALL_LOCATIONS.find(loc =>
        loc.city.toLowerCase() === lowerCity ||
        loc.aliases.some(a => a.toLowerCase() === lowerCity)
    ) || null;
}

/**
 * Check if text contains Japanese characters
 */
export function containsJapanese(text: string): boolean {
    // Hiragana, Katakana, and Kanji ranges
    return /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(text);
}
