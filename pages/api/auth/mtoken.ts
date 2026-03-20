import type { NextApiRequest, NextApiResponse } from 'next'

export type MTokenProfile = {
    userId?: string;
    citizenId?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirthString?: string;
    mobile?: string;
    email?: string;
    notification?: boolean;
};

// Helper to get environment variables safely
function getEnv(name: string) {
    return process.env[name] || '';
}

async function fetchMTokenAuthToken() {
    const authUrl = getEnv("GDX_AUTH_URL");
    const secret = getEnv("CONSUMER_SECRET");
    const agentId = getEnv("AGENT_ID");
    const key = getEnv("CONSUMER_KEY");

    const url = new URL(authUrl);
    url.searchParams.set("ConsumerSecret", secret);
    url.searchParams.set("AgentID", agentId);

    const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
            "Consumer-Key": key,
            "Content-Type": "application/json",
        }
    });

    const raw = await response.text();
    let payload: any = null;
    try {
        payload = JSON.parse(raw);
    } catch { }

    if (!response.ok || !payload?.Result) {
        throw new Error(payload?.message || `mToken authentication failed (${response.status})`);
    }

    return String(payload.Result);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { appId, mToken } = req.body;

    if (!appId || !mToken) {
        return res.status(400).json({ message: 'Missing appId or mToken' });
    }

    try {
        let profile: MTokenProfile;

        // [Smart Mock Interceptor] for local testing
        // Normalize mToken (handle URL encoding like smart-mock%3A)
        const normalizedMToken = decodeURIComponent(mToken);
        const mockPrefix = "smart-mock:";
        
        if (normalizedMToken.startsWith(mockPrefix)) {
            const base64Payload = normalizedMToken.replace(mockPrefix, "");
            const decodedString = Buffer.from(base64Payload, "base64").toString("utf-8");
            
            let mockResult: any;
            try {
                mockResult = JSON.parse(decodedString);
            } catch (err: any) {
                throw new Error(`Invalid Mock JSON: ${err.message}`);
            }
            
            profile = {
                userId: mockResult.userId || mockResult.UserId || `mock-user-${Date.now()}`,
                citizenId: mockResult.citizenId || mockResult.CitizenId,
                firstName: mockResult.firstName || mockResult.FirstName || 'ชาวบ้าน',
                lastName: mockResult.lastName || mockResult.LastName || 'ใจดี',
                dateOfBirthString: mockResult.dateOfBirthString || mockResult.DateOfBirthString,
                mobile: mockResult.mobile || mockResult.Mobile || mockResult.telephone || mockResult.phoneNumber || '0888888888',
                email: mockResult.email || mockResult.Email || 'mock@example.com',
                notification: mockResult.notification !== undefined ? mockResult.notification : true,
            };
        } else {
            // Real MToken Flow
            const gdxToken = await fetchMTokenAuthToken();
            console.log("--- [ NEW BRIDGE CODE v2 ACTIVE ] ---");
            
            // Try with provided appId first, using PascalCase as seen in smartcbt-webportal
            const tryFetch = async (targetAppId: string) => {
                const body = { AppId: targetAppId, MToken: mToken };
                console.log(`MToken Bridge Request [GDX_REQ]: (${targetAppId}):`, JSON.stringify(body));

                const profileResponse = await fetch(getEnv("PROFILE_ACCESS_API_URL"), {
                    method: "POST",
                    headers: {
                        "Consumer-Key": getEnv("CONSUMER_KEY"),
                        "Content-Type": "application/json",
                        "Token": gdxToken,
                    },
                    body: JSON.stringify(body)
                });

                const raw = await profileResponse.text();
                let payload: any = null;
                try {
                    payload = JSON.parse(raw);
                } catch { }

                if (!profileResponse.ok || payload?.messageCode !== 200 || !payload?.result) {
                    return null;
                }
                return payload.result;
            };

            let result = await tryFetch(appId);
            
            // Fallback to 'webapp' if the first call returned null fields, but successfully identified the user
            if (result && (!result.firstName && !result.FirstName && !result.email && !result.Email)) {
                console.log("MToken Bridge: Profile fields are null. Retrying with appId='webapp'...");
                const fallbackResult = await tryFetch('webapp');
                if (fallbackResult && (fallbackResult.firstName || fallbackResult.Email)) {
                    result = fallbackResult;
                    console.log("MToken Bridge: Fallback success!");
                }
            }

            if (!result) {
                return res.status(401).json({ 
                    message: 'ไม่สามารถดึงข้อมูลผู้ใช้จาก mToken ได้ หรือ mToken หมดอายุแล้ว' 
                });
            }

            console.log("MToken Bridge Success! Result:", JSON.stringify(result));

            profile = {
                userId: result.userId || result.UserId || result.user_id || result.UserID,
                citizenId: result.citizenId || result.CitizenId || result.citizen_id || result.CitizenID,
                firstName: result.firstName || result.FirstName || result.first_name || result.Firstname,
                lastName: result.lastName || result.LastName || result.last_name || result.Lastname,
                dateOfBirthString: result.dateOfBirthString || result.DateOfBirthString || result.birthday || result.BirthDate,
                mobile: result.mobile || result.Mobile || result.telephone || result.phoneNumber || result.phone_number || result.MobileNo,
                email: result.email || result.Email || result.email_address || result.EmailAddress || result.Mail,
                notification: result.notification !== undefined ? result.notification : (result.Notification !== undefined ? result.Notification : true)
            };
        }

        // Return the profile to the frontend
        // The frontend will then decide whether to login or register
        return res.status(200).json({ 
            success: true, 
            profile 
        });

    } catch (error: any) {
        console.error("MToken API Bridge Error:", error);
        return res.status(500).json({ 
            message: error.message || 'Internal Server Error' 
        });
    }
}
