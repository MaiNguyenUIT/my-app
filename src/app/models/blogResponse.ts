export interface BlogResponse {
    id: string;
    title: string;
    content: string;
    createdDate: string;
    userName : string;
    userAvatar : string;
    isPublic : string
    expanded? : boolean
  }