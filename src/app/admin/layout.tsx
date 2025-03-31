import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from "@/components/sidebar";
import { SidebarLayout } from "@/components/sidebar-layout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SidebarLayout
        navbar={<></>}
        sidebar={
          <Sidebar>
            <SidebarHeader>
              <SidebarSection>
                <SidebarLabel>
                  <span className="text-emerald-800 dark:text-emerald-500">
                    OpenMic
                  </span>
                  <span className="text-red-800 dark:text-red-500"> MPLS</span>
                </SidebarLabel>
              </SidebarSection>
            </SidebarHeader>
            <SidebarBody>
              <SidebarSection>
                <SidebarItem href="/admin/events">Events</SidebarItem>
                <SidebarItem href="/admin/artists">Artists</SidebarItem>
                <SidebarItem href="/">Landing Page</SidebarItem>
                <SidebarItem href="/now">Now Playing</SidebarItem>
              </SidebarSection>
            </SidebarBody>
          </Sidebar>
        }
      >
        <div>{children}</div>
      </SidebarLayout>
    </div>
  );
}
