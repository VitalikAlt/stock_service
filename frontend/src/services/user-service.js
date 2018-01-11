import Base64 from './base64'

const HARDCODE_COOKIE = "eyJkZXYiOiBbImFkbWlucy1kZXYvc3FfZ2l0Zmxvd19jaSJdfQ==";

class User {
  constructor(cookie) {
    this.cookie = cookie;
    this.dev = false;
    this.qa = false;
    this.pm = false;
    this.getUserData();
    this.saveUserRoles();
  }

  getUserData() {
    this.userRoles = this.getUserRoles();
    console.log(this.userRoles);
    this.uid = this.cookie.get('user_uid') || null;
  }

  getSavedStatement() {
    const project = localStorage.getItem('project');
    this.currentProject = project;
    const ciProps = localStorage.getItem(`${this.currentProject}__ci_props`);
    const artifacts = localStorage.getItem(`${this.currentProject}__artifacts`);
    const buildVersions = localStorage.getItem(`${this.currentProject}__build_versions`);
    return {
      project: project,
      action: localStorage.getItem(`${this.currentProject}__action`),
      fromBranch: localStorage.getItem(`${this.currentProject}__from_branch`),
      toBranch: localStorage.getItem(`${this.currentProject}__to_branch`),
      lockBranch: localStorage.getItem(`${this.currentProject}__lock_branch`),
      ciProps: ciProps ? JSON.parse(ciProps) : null,
      buildVersions: buildVersions ? JSON.parse(buildVersions) : null,
      artifacts: artifacts ? JSON.parse(artifacts) : {},
      ciBranch: localStorage.getItem(`${this.currentProject}__ci_branch`)
    }
  }

  getUserRoles() {
    let cookie = this.cookie.get('project_user_roles');
    try {
      if (!cookie)
        cookie = HARDCODE_COOKIE;
      // return null;

      const roles = JSON.parse((Base64.decode(cookie)));

      if(roles.dev)
        this.dev = true;
      if(roles.pm)
        this.pm = true;
      if(roles.qa)
        this.qa = true;

      return roles;
    } catch (e) {
      console.log(e)
    }
  }



  get currentAction() {
    return localStorage.getItem(`${this.currentProject}__action`)
  }

  saveUserRoles() {
    const savedRoles = localStorage.getItem('user_roles');
    const newRoles = JSON.stringify(this.userRoles);
    if (savedRoles !== newRoles) {
      localStorage.clear();
      localStorage.setItem('user_roles', newRoles)
    }
  }

  saveProjectStatus(project) {
    this.currentProject = project;
    localStorage.setItem('project', project);
  }

  saveActionStatus(action) {
    localStorage.setItem(`${this.currentProject}__action`, action);
  }

  saveFromAndToBranches(fromBranch, toBranch) {
    localStorage.setItem(`${this.currentProject}__from_branch`, fromBranch);
    localStorage.setItem(`${this.currentProject}__to_branch`, toBranch);
  }

  saveLockBranch(value) {
    localStorage.setItem(`${this.currentProject}__lock_branch`, value);
  }

  saveCIProps(value) {
    localStorage.setItem(`${this.currentProject}__ci_props`, JSON.stringify(value));
  }

  saveArtifacts(value) {
    localStorage.setItem(`${this.currentProject}__artifacts`, JSON.stringify(value));
  }

  saveBuildVersions(value) {
    localStorage.setItem(`${this.currentProject}__build_versions`, JSON.stringify(value));
  }

  saveCiBranch(value) {
    localStorage.setItem(`${this.currentProject}__ci_branch`, value);
  }

  resetSavedData() {
    localStorage.removeItem(`${this.currentProject}__project`);
    localStorage.removeItem(`${this.currentProject}__action`);
    localStorage.removeItem(`${this.currentProject}__from_branch`);
    localStorage.removeItem(`${this.currentProject}__to_branch`);
    localStorage.removeItem(`${this.currentProject}__lock_branch`);
    localStorage.removeItem(`${this.currentProject}__source_type`);
    localStorage.removeItem(`${this.currentProject}__ci_props`);
    localStorage.removeItem(`${this.currentProject}__artifacts`);
    localStorage.removeItem(`${this.currentProject}__ci_branch`);
  }
}

export default {
  install(Vue, options) {
    Vue.prototype.$user = new User(Vue.cookie);
  }
};
