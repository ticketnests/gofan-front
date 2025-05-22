
// Admin Dashboard;
export interface Event {
    id: string;
    type: string;
    startDate: string;
    name: string;
    isActive: boolean;
    ticketsSold: number;
    CPT: number;
    description: string;
}


export interface ClientEvent {
    eventId: string;
    id?: string;
    description?: string;
    type: string;
    startDate: number | string;
    endDate: number | string;
    name: string;
    date?: string;

}



export interface PriceOption {
    price: string | number;
    name: string;
    priceId?: string;
    amountOfTickets?: number;
}

export interface CreateEvent {
    type: string;
    startDate: number;
    endDate: number;
    options: PriceOption[],
    isActive: boolean;
    name: string;
    description: string;
}



export interface School {
    id: string;
    name: string;
    address: string;
    events: ClientEvent[];
}



export interface NotifType {
    type: string;
    message: string;

}

export interface ResType {
    message: string;
    code: string;
}


// Admin Dashboard
export interface DashboardTicket {
    name: string;
    email: string;
    amountPaid: number;
    // <td className="link hover:text-blue-500">{ticket.name}</td>
    // <td>{ticket.email}</td>
    // <td>{ticket.amountPaid}</td>
}

export interface DataMetrics {
    totalRevenue: number | null;
    ticketsSold: number | null;
    lastWithdraw: number | null;
    amountAvailable: number | null;
}


// Global sessionStorage user 

export interface NonDashEvent {
    date: string;
    endDate: string;
    id: string;
    name: string;
    startDate: number;
    type: string;

}

export interface FullTicket {
    ticketId: string;
    isActive: boolean;
    type: string;
    school: string;
    name: string;
    startDate: number;


}

export interface NewUser {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
}

export interface User {
    email: string;
    events?: NonDashEvent[]
    hasVerified?: boolean;
    isAdmin: boolean;
    name: string;
    isSecurity?: boolean;
    schoolAddress: string;
    uuid: string;
    id?: string;
    tickets: FullTicket[]

}






// This is for the scannedUser 

export interface BasicTicket {
    ticketId: string;
    isActive: boolean;
    name: string;
}



export interface ScannedPerson {
    uuid: string;
    name: string;
    ticket: BasicTicket;
}


// Search page;

export interface SearchResult {
    categoryId: string;
    schoolName: string;



}




export type Timeout = ReturnType<typeof setTimeout> | undefined;




// Search.tsx

export interface Person {
    email: string;
    hasCompleted: boolean;
    name: string | undefined | null;
    uuid: string;


}






// {
//     "id": "fa1d9043-d106-4a17-906c-712e66601092",
//     "type": "other",
//     "startDate": "1747386180000",
//     "name": "Hello",
//     "isActive": true,
//     "ticketsSold": 24,
//     "CPT": 10,
//     "description": "Hello there"
//   }