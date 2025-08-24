// ----------------------------------------------------------------------

export type RoleBasedGuardProp = {
  currentRole: string;
  hasContent?: boolean;
  acceptRoles: string[];
  children: React.ReactNode;
};

export function RoleBasedGuard({
  children,
  hasContent,
  currentRole,
  acceptRoles,
}: RoleBasedGuardProp) {
  if (typeof acceptRoles !== 'undefined' && !acceptRoles.includes(currentRole)) {
    return hasContent ? <div /> : null;
  }

  return <> {children} </>;
}
