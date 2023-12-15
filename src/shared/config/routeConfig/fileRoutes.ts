export const getFileDownloadRoute = (fileId: string) => {
    return `/files/download/${fileId}`;
};

export const getDeleteFileRoute = (fileId: string) => {
    return `/files/${fileId}`;
};

export const getProfileAvatarUploadRoute = (profileId: string) => {
    return `/files/upload/avatar/${profileId}`;
};

export const getEmployeeAvatarUploadRoute = (employeeId: string) => {
    return `/files/upload/employee/${employeeId}`;
};
