"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Settings, Mail, Shield, Key, Palette, Database } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import GeneralSettingsForm from "./components/forms/GeneralSettingsForm";
import EmailSettingsForm from "./components/forms/EmailSettingsForm";
import SecuritySettingsForm from "./components/forms/SecuritySettingsForm";
import {
  getSettings,
  updateGeneralSettings,
  updateEmailSettings,
  updateSecuritySettings,
} from "./actions/settings-actions";

export default function SettingsPage() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    loadSettings();
  }, [session]);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const { settings: fetchedSettings, error } = await getSettings();

      if (error) {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
        return;
      }

      setSettings(fetchedSettings);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneralSettingsSubmit = async (data) => {
    try {
      const { settings: updatedSettings, error } = await updateGeneralSettings(data);

      if (error) {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
        return;
      }

      setSettings(updatedSettings);
      toast({
        title: "Success",
        description: "General settings updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update general settings",
        variant: "destructive",
      });
    }
  };

  const handleEmailSettingsSubmit = async (data) => {
    try {
      const { settings: updatedSettings, error } = await updateEmailSettings(data);

      if (error) {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
        return;
      }

      setSettings(updatedSettings);
      toast({
        title: "Success",
        description: "Email settings updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update email settings",
        variant: "destructive",
      });
    }
  };

  const handleSecuritySettingsSubmit = async (data) => {
    try {
      const { settings: updatedSettings, error } = await updateSecuritySettings(data);

      if (error) {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
        return;
      }

      setSettings(updatedSettings);
      toast({
        title: "Success",
        description: "Security settings updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update security settings",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
          <div className="h-[600px] bg-gray-100 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="container ml-[6%] mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-600">
          Manage your application settings and preferences
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-8">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Email</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span className="hidden sm:inline">API</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Backup</span>
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100vh-16rem)] rounded-md border p-4">
          <TabsContent value="general" className="mt-0">
            <GeneralSettingsForm
              initialData={settings}
              onSubmit={handleGeneralSettingsSubmit}
            />
          </TabsContent>

          <TabsContent value="email" className="mt-0">
            <EmailSettingsForm
              initialData={settings}
              onSubmit={handleEmailSettingsSubmit}
            />
          </TabsContent>

          <TabsContent value="security" className="mt-0">
            <SecuritySettingsForm
              initialData={settings}
              onSubmit={handleSecuritySettingsSubmit}
            />
          </TabsContent>

          <TabsContent value="api" className="mt-0">
            {/* API Settings Form will be added here */}
            <div className="text-center py-12 text-gray-500">
              API Settings coming soon
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="mt-0">
            {/* Appearance Settings Form will be added here */}
            <div className="text-center py-12 text-gray-500">
              Appearance Settings coming soon
            </div>
          </TabsContent>

          <TabsContent value="backup" className="mt-0">
            {/* Backup Settings Form will be added here */}
            <div className="text-center py-12 text-gray-500">
              Backup Settings coming soon
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}