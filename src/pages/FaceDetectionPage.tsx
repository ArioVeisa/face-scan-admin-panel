
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, CheckCheck, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type DetectionStatus = "idle" | "loading" | "match" | "not_found";

interface DetectionResult {
  status: DetectionStatus;
  student?: {
    name: string;
    nim: string;
    program: string;
    photo: string;
  };
  accuracy?: string;
  timestamp?: string;
}

const FaceDetectionPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [detectionResult, setDetectionResult] = useState<DetectionResult>({
    status: "idle",
  });
  const { toast } = useToast();

  // Handle file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        // Reset detection result
        setDetectionResult({ status: "idle" });
        // Set selected image
        setSelectedImage(event.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  // Handle detection process
  const handleDetect = () => {
    if (!selectedImage) {
      toast({
        title: "Gambar diperlukan",
        description: "Pilih gambar terlebih dahulu untuk deteksi wajah",
        variant: "destructive",
      });
      return;
    }

    // Set loading state
    setDetectionResult({ status: "loading" });

    // Simulate API call/detection process
    setTimeout(() => {
      // Randomly determine if face is detected (for demo purposes)
      const isDetected = Math.random() > 0.3;
      
      if (isDetected) {
        // Simulate match result
        setDetectionResult({
          status: "match",
          student: {
            name: "Budi Santoso",
            nim: "190041234",
            program: "Teknik Informatika",
            photo: "https://i.pravatar.cc/150?img=1",
          },
          accuracy: "96.8%",
          timestamp: new Date().toLocaleTimeString(),
        });
        
        toast({
          title: "Wajah Terdeteksi",
          description: "Mahasiswa ditemukan: Budi Santoso",
        });
      } else {
        // Simulate not found result
        setDetectionResult({
          status: "not_found",
          timestamp: new Date().toLocaleTimeString(),
        });
        
        toast({
          title: "Wajah Tidak Ditemukan",
          description: "Tidak ada kecocokan dengan data mahasiswa",
          variant: "destructive",
        });
      }
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Deteksi Wajah</h1>
        <p className="text-muted-foreground">
          Upload gambar untuk mendeteksi dan mengidentifikasi mahasiswa
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              <span>Upload Gambar Wajah</span>
            </CardTitle>
            <CardDescription>
              Pilih atau ambil gambar wajah untuk dideteksi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <label htmlFor="face-upload" className="cursor-pointer block">
                <div 
                  className={`border-2 border-dashed rounded-md p-6 transition-colors ${
                    selectedImage ? "border-primary/50 bg-primary/5" : "border-muted-foreground/20"
                  }`}
                >
                  {selectedImage ? (
                    <div className="relative aspect-video max-h-[300px] overflow-hidden rounded-md">
                      <img
                        src={selectedImage}
                        alt="Selected face"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm font-medium">
                        Klik untuk upload gambar atau drop file di sini
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Format gambar: .jpg, .jpeg, .png
                      </p>
                    </div>
                  )}
                </div>
                <input
                  id="face-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
              
              <Button
                onClick={handleDetect}
                className="w-full"
                disabled={!selectedImage || detectionResult.status === "loading"}
              >
                {detectionResult.status === "loading" ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    <span>Memproses...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    <span>Deteksi Wajah</span>
                  </div>
                )}
              </Button>
              
              {selectedImage && (
                <p className="text-xs text-center text-muted-foreground">
                  Upload gambar dengan pencahayaan baik untuk hasil terbaik
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Result Section */}
        <Card className={`card-shadow ${
          detectionResult.status === "idle" ? "bg-muted/30" : 
          detectionResult.status === "match" ? "bg-green-50" :
          detectionResult.status === "not_found" ? "bg-red-50" : ""
        }`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {detectionResult.status === "match" ? (
                <>
                  <CheckCheck className="h-5 w-5 text-green-600" />
                  <span className="text-green-600">Wajah Terdeteksi</span>
                </>
              ) : detectionResult.status === "not_found" ? (
                <>
                  <X className="h-5 w-5 text-red-600" />
                  <span className="text-red-600">Wajah Tidak Ditemukan</span>
                </>
              ) : (
                <>
                  <span>Hasil Deteksi</span>
                </>
              )}
            </CardTitle>
            <CardDescription>
              {detectionResult.status === "idle" && "Data mahasiswa akan ditampilkan di sini"}
              {detectionResult.status === "loading" && "Sedang memproses deteksi..."}
              {detectionResult.status === "match" && `Terdeteksi pada ${detectionResult.timestamp}`}
              {detectionResult.status === "not_found" && "Tidak ada kecocokan dengan data mahasiswa"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {detectionResult.status === "idle" && (
              <div className="text-center py-12 text-muted-foreground">
                <Camera className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p>Upload dan deteksi gambar untuk melihat hasil</p>
              </div>
            )}

            {detectionResult.status === "loading" && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                <p className="mt-4 text-muted-foreground">Sedang memproses deteksi wajah...</p>
              </div>
            )}

            {detectionResult.status === "match" && detectionResult.student && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="h-24 w-24 rounded-full overflow-hidden bg-white border-4 border-green-200">
                    <img
                      src={detectionResult.student.photo}
                      alt={`Foto ${detectionResult.student.name}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg font-semibold">{detectionResult.student.name}</h3>
                    <p className="text-muted-foreground">{detectionResult.student.nim}</p>
                    <p className="text-sm text-muted-foreground">{detectionResult.student.program}</p>
                    <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Akurasi: {detectionResult.accuracy}
                    </div>
                  </div>
                </div>
                <div className="border-t border-green-200 pt-4">
                  <h4 className="text-sm font-medium mb-2">Detail Deteksi</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Waktu Deteksi</div>
                    <div className="text-muted-foreground">{detectionResult.timestamp}</div>
                    <div>Status</div>
                    <div className="text-green-600">Terdeteksi</div>
                    <div>Tingkat Kecocokan</div>
                    <div className="text-muted-foreground">{detectionResult.accuracy}</div>
                  </div>
                </div>
              </div>
            )}

            {detectionResult.status === "not_found" && (
              <div className="space-y-6 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-600">Wajah Tidak Ditemukan</h3>
                  <p className="text-muted-foreground mt-1">
                    Tidak ada kecocokan dengan data mahasiswa yang terdaftar
                  </p>
                </div>
                <div className="border-t border-red-200 pt-4">
                  <h4 className="text-sm font-medium mb-2">Kemungkinan Penyebab</h4>
                  <ul className="text-sm text-left list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Mahasiswa belum terdaftar dalam sistem</li>
                    <li>Kualitas gambar kurang baik</li>
                    <li>Pencahayaan tidak memadai</li>
                    <li>Sudut pengambilan gambar tidak tepat</li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className={`${
            detectionResult.status === "idle" || detectionResult.status === "loading" ? "hidden" : ""
          }`}>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setDetectionResult({ status: "idle" });
                setSelectedImage(null);
              }}
            >
              Deteksi Baru
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle>Tips Deteksi Wajah</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <div className="font-medium">Pencahayaan</div>
              <p className="text-muted-foreground">
                Pastikan wajah terlihat jelas dengan pencahayaan yang cukup dan merata
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-medium">Posisi</div>
              <p className="text-muted-foreground">
                Wajah menghadap ke depan dan tidak terhalang (tanpa masker, topi, atau kacamata gelap)
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-medium">Kualitas Gambar</div>
              <p className="text-muted-foreground">
                Gunakan gambar beresolusi cukup (minimal 300x300 piksel) dan tidak blur
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FaceDetectionPage;
