export class UserInfo {
    constructor(infoName, infoJob) {
      this.infoName = infoName;
      this.infoJob = infoJob;
      this.name = infoName.textContent;
      this.job = infoJob.textContent;
    }
  
    setUserInfo(name, job) {
      this.name = name;
      this.job = job;
    }

    updateUserInfo() {
      this.infoName.textContent = this.name;
      this.infoJob.textContent = this.job;
    }
};