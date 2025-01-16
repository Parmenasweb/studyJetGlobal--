"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { getUniversity } from "@/actions/destination";
import { LoadingPage } from "@/components/loading";
import { ErrorPage } from "@/components/error";
import { ChevronLeft, GraduationCap, Award, ImageIcon, MapPin, Globe, Mail, Phone, Pencil, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ImageView from "@/components/ImageView";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteUniversity } from "@/actions/destination";

export default function UniversityDetailsPage({ params }) {
  const { destinationId, universityId } = params;
  const router = useRouter();
  const { toast } = useToast();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/login");
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [university, setUniversity] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    fetchUniversity();
  }, [status]);

  async function fetchUniversity() {
    try {
      setLoading(true);
      setError(null);
      const data = await getUniversity(destinationId, universityId);
      setUniversity(data);
    } catch (error) {
      console.error("Error fetching university:", error);
      setError(error.message || "Failed to fetch university");
      toast({
        title: "Error",
        description: error.message || "Failed to fetch university",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    try {
      setIsDeleting(true);
      await deleteUniversity(destinationId, universityId);
      toast({
        title: "Success",
        description: "University deleted successfully",
      });
      router.push(`/private/dashboard/destinations/${destinationId}/universities`);
    } catch (error) {
      console.error("Error deleting university:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete university",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  }

  if (status === "loading" || loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">{university.name}</h2>
              <p className="text-muted-foreground">
                View and manage university details
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/private/dashboard/destinations/${destinationId}/universities/${universityId}/edit`)}
              className="flex items-center gap-2"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteDialog(true)}
              disabled={isDeleting}
              className="flex items-center gap-2"
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              Delete
            </Button>
          </div>
        </div>

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the university
                and all its associated data including programs and scholarships.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete University"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Separator />

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Overview content */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Link 
                href={`/private/dashboard/destinations/${destinationId}/universities/${universityId}/programs`}
                className="block"
              >
                <div className="rounded-lg border p-4 hover:bg-accent transition-colors">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold">Programs</h3>
                  </div>
                  <p className="mt-2 text-2xl font-bold">
                    {university.programs?.length || 0}
                  </p>
                </div>
              </Link>

              <Link 
                href={`/private/dashboard/destinations/${destinationId}/universities/${universityId}/scholarships`}
                className="block"
              >
                <div className="rounded-lg border p-4 hover:bg-accent transition-colors">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold">Scholarships</h3>
                  </div>
                  <p className="mt-2 text-2xl font-bold">
                    {university.scholarships?.length || 0}
                  </p>
                </div>
              </Link>
            </div>

            {/* University details */}
            <div className="rounded-lg border p-6 space-y-6">
              <h3 className="text-lg font-semibold">University Details</h3>
              
              {/* Main Image */}
              {university.media?.mainImage?.url ? (
                <div className="space-y-2">
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <ImageView
                      src={university.media.mainImage.url}
                      alt={university.media.mainImage.alt || university.name}
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={100}
                      loading="lazy"
                      lo="true"
                    />
                  </div>
                  {university.media.mainImage.caption && (
                    <p className="text-sm text-muted-foreground text-center">
                      {university.media.mainImage.caption}
                    </p>
                  )}
                </div>
              ) : (
                <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
              )}

              {/* Basic Information */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{university.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    <a href={university.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {university.website}
                    </a>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${university.contactEmail}`} className="hover:underline">
                      {university.contactEmail}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{university.contactPhone}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-medium">About</h4>
                <p className="text-muted-foreground whitespace-pre-wrap">{university.description}</p>
              </div>

              {/* Gallery Images */}
              {university.media?.galleryImages?.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-medium">Gallery</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {university.media.galleryImages.map((image, index) => (
                      <div key={index} className="space-y-2">
                        <div className="aspect-video relative rounded-lg overflow-hidden">
                          <ImageView
                            src={image.url}
                            alt={image.alt || `Gallery image ${index + 1}`}
                            className="object-cover"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            quality={100}
                            loading="lazy"
                            lo="true"
                          />
                        </div>
                        {image.caption && (
                          <p className="text-sm text-muted-foreground text-center">
                            {image.caption}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="programs">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Programs</h3>
                <Link href={`/private/dashboard/destinations/${destinationId}/universities/${universityId}/programs`}>
                  <Button>
                    <GraduationCap className="mr-2 h-4 w-4" />
                    View All Programs
                  </Button>
                </Link>
              </div>
              {/* Programs preview or summary */}
            </div>
          </TabsContent>

          <TabsContent value="scholarships">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Scholarships</h3>
                <Link href={`/private/dashboard/destinations/${destinationId}/universities/${universityId}/scholarships`}>
                  <Button>
                    <Award className="mr-2 h-4 w-4" />
                    View All Scholarships
                  </Button>
                </Link>
              </div>
              {/* Scholarships preview or summary */}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 