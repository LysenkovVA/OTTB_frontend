export const getFileDownloadRoute = (fileId: string) => {
    return `/files/download/${fileId}`;
};

export const getDeleteFileRoute = (fileId: string) => {
    return `/files/${fileId}`;
};

/**
 * @deprecated
 * @param profileId
 */
export const getProfileAvatarUploadRoute = (profileId: string) => {
    return `/files/upload/avatar/${profileId}`;
};

/**
 * @deprecated
 * @param employeeId
 */
export const getEmployeeAvatarUploadRoute = (employeeId: string) => {
    return `/files/upload/employee/${employeeId}`;
};
