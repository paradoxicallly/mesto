export default class UserInfo {
    constructor ({ profileName, profileDescription, profileAvatar }) {
        this._profileName = document.querySelector(profileName);
        this._profileDescription = document.querySelector(profileDescription);
        this._profileAvatar = document.querySelector(profileAvatar);
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            description: this._profileDescription.textContent,
        }
    }

    setUserInfo(name, description, avatar = profileAvatar) {
        this._profileName.textContent = name;
        this._profileDescription.textContent = description;
        this._profileAvatar.src= avatar;
    }
}