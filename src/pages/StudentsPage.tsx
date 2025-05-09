
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Upload, FileText, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for students
const initialStudents = [
  {
    id: 1,
    name: "Budi Santoso",
    nim: "190041234",
    program: "Teknik Informatika",
    photo: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Rina Wati",
    nim: "190042345",
    program: "Sistem Informasi",
    photo: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    name: "Ahmad Farhan",
    nim: "190043456",
    program: "Teknik Komputer",
    photo: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Siti Aminah",
    nim: "190044567",
    program: "Teknik Informatika",
    photo: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Deni Pratama",
    nim: "190045678",
    program: "Sistem Informasi",
    photo: "https://i.pravatar.cc/150?img=7",
  },
];

interface Student {
  id: number;
  name: string;
  nim: string;
  program: string;
  photo: string;
}

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    nim: "",
    program: "",
    photo: null as File | null,
  });

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle program select change
  const handleProgramChange = (value: string) => {
    setFormData((prev) => ({ ...prev, program: value }));
  };

  // Handle photo upload
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, photo: e.target.files![0] }));
    }
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.nim || !formData.program) {
      toast({
        title: "Validasi Gagal",
        description: "Semua field harus diisi",
        variant: "destructive",
      });
      return;
    }

    // Create new student
    const newStudent: Student = {
      id: students.length + 1,
      name: formData.name,
      nim: formData.nim,
      program: formData.program,
      // Use random avatar if no photo uploaded
      photo: formData.photo 
        ? URL.createObjectURL(formData.photo)
        : `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
    };

    // Add to students list
    setStudents((prev) => [...prev, newStudent]);
    
    // Reset form and close dialog
    setFormData({
      name: "",
      nim: "",
      program: "",
      photo: null,
    });
    setIsDialogOpen(false);

    // Show success toast
    toast({
      title: "Berhasil",
      description: "Data mahasiswa berhasil ditambahkan",
    });
  };

  // Handle import submit
  const handleImport = () => {
    // Simulate successful import
    toast({
      title: "Import Berhasil",
      description: "Data mahasiswa berhasil diimport dari Excel",
    });
    setIsImportDialogOpen(false);
  };

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nim.includes(searchTerm) ||
      student.program.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Data Mahasiswa</h1>
          <p className="text-muted-foreground">
            Kelola data mahasiswa untuk sistem deteksi wajah
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Tambah Mahasiswa
          </Button>
          <Button variant="outline" onClick={() => setIsImportDialogOpen(true)}>
            <FileText className="mr-2 h-4 w-4" /> Import Excel
          </Button>
        </div>
      </div>

      {/* Search and filter */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari mahasiswa berdasarkan nama, NIM, atau program studi..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Students table */}
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-4 py-3.5 text-left text-sm font-semibold">Foto</th>
                <th className="px-4 py-3.5 text-left text-sm font-semibold">Nama</th>
                <th className="px-4 py-3.5 text-left text-sm font-semibold">NIM</th>
                <th className="px-4 py-3.5 text-left text-sm font-semibold">Program Studi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="px-4 py-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-muted">
                      <img
                        src={student.photo}
                        alt={`Foto ${student.name}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">{student.name}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {student.nim}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {student.program}
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                    Tidak ada data mahasiswa yang ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Tambah Mahasiswa</DialogTitle>
            <DialogDescription>
              Masukkan data mahasiswa baru ke dalam sistem
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nama lengkap mahasiswa"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nim">NIM</Label>
                <Input
                  id="nim"
                  name="nim"
                  value={formData.nim}
                  onChange={handleInputChange}
                  placeholder="Nomor Induk Mahasiswa"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="program">Program Studi</Label>
                <Select
                  value={formData.program}
                  onValueChange={handleProgramChange}
                >
                  <SelectTrigger id="program">
                    <SelectValue placeholder="Pilih program studi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Teknik Informatika">
                      Teknik Informatika
                    </SelectItem>
                    <SelectItem value="Sistem Informasi">
                      Sistem Informasi
                    </SelectItem>
                    <SelectItem value="Teknik Komputer">
                      Teknik Komputer
                    </SelectItem>
                    <SelectItem value="Teknik Elektro">
                      Teknik Elektro
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="photo">Foto</Label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                    {formData.photo ? (
                      <img
                        src={URL.createObjectURL(formData.photo)}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Upload className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <label
                    htmlFor="photo-upload"
                    className="cursor-pointer flex-1"
                  >
                    <div className="border-2 border-dashed rounded-md p-4 text-center">
                      <Upload className="h-4 w-4 mx-auto text-muted-foreground" />
                      <p className="text-sm mt-2">
                        {formData.photo
                          ? formData.photo.name
                          : "Upload foto (klik atau drop file)"}
                      </p>
                    </div>
                    <Input
                      id="photo-upload"
                      name="photo"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handlePhotoChange}
                    />
                  </label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Import Excel Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Import Data dari Excel</DialogTitle>
            <DialogDescription>
              Upload file Excel dengan format yang sesuai
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <label htmlFor="excel-upload" className="cursor-pointer">
              <div className="border-2 border-dashed rounded-md p-8 text-center">
                <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="text-sm mt-2">
                  Klik untuk upload file Excel atau drop file di sini
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Format yang didukung: .xlsx, .xls
                </p>
              </div>
              <Input
                id="excel-upload"
                type="file"
                className="hidden"
                accept=".xlsx, .xls"
              />
            </label>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">Petunjuk:</p>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li>File harus berisi kolom: Nama, NIM, Program Studi</li>
                <li>Ukuran maksimal file adalah 10MB</li>
                <li>Data foto dapat ditambahkan kemudian</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleImport}>Import</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentsPage;
