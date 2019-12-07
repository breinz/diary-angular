export default class User {

    constructor(
        public id: string,
        public name: string,
        public email: string,
        private _token: string,
        public refreshToken: string,
        private _expiredAt: Date,
        public lang?: string
    ) {


    }

    get token(): string {
        if (!this._expiredAt || this._expiredAt < new Date()) {
            return null;
        }
        return this._token;
    }

    get expireAt(): Date {
        return this._expiredAt;
    }
}