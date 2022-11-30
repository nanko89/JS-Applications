import { setUserData, clearUserData } from "../util.js";
import { del, get, post, put } from "./api.js";

const endpoints = {
  login: "/users/login",
  register: "/users/register",
  logout: "/users/logout",
  teams: "/data/teams",
  teamsById: "/data/teams/",
  member: "/data/members",
  memberId: "/data/members/",
  memberByTeamId: teamId =>
    `/data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`,
  myTeams: userId =>
    `/data/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`,
};

export async function login(email, password) {
  const result = await post(endpoints.login, { email, password });
  if (typeof result == "object") {
    setUserData(result);
  }
  return result;
}

export async function register(email, username, password, repass) {
  const result = await post(endpoints.register, {
    email,
    username,
    password,
    repass,
  });
  setUserData(result);

  return result;
}

export async function logout() {
  get(endpoints.logout);
  clearUserData();
}

export async function createTeam(name, logoUrl, description) {
  const result = await post(endpoints.teams, { name, logoUrl, description });
  return result;
}

export async function editTeam(name, logoUrl, description) {
  const result = await put(endpoints.teamsById + id, {
    name,
    logoUrl,
    description,
  });
  return result;
}

export async function addMemeberToTeam(_id, teamId) {
  const result = await post(endpoints.member, { _id, teamId });
  return result;
}

export async function approveMemberShip(id, _ownerId, teamId) {
  const result = await put(endpoints.memberId + id, {
    _ownerId,
    teamId,
    status: "member",
  });
  return result;
}

export async function getAllTeams() {
  const result = await get(endpoints.teams);
  return result;
}

export async function getAllMyTeams(id) {
  const result = await get(endpoints.myTeams(id));
  return result;
}

export async function getAllMemberInTeam(id) {
  const result = await get(endpoints.memberByTeamId(id));
  return result;
}

export async function getTeamById(id) {
  const result = await get(endpoints.teamsById + id);
  return result;
}

export async function deleteMemeber(id) {
  const result = await del(endpoints.memberId + id);
  return result;
}
