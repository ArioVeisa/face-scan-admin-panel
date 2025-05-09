
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CheckCheck, X, Calendar as CalendarIcon, Download, Search, ArrowDown, ArrowUp } from "lucide-react";
import { format } from "date-fns";
import { id } from 'date-fns/locale';

// Mock data for history entries
const historyData = [
  {
    id: 1,
    timestamp: "2023-05-09T08:45:30",
    studentName: "Budi Santoso",
    studentId: "190041234",
    status: "match",
    accuracy: "98%",
    photoUrl: "https://example.com/photos/1.jpg",
  },
  {
    id: 2,
    timestamp: "2023-05-09T08:38:15",
    studentName: "Rina Wati",
    studentId: "190042345",
    status: "match",
    accuracy: "96%",
    photoUrl: "https://example.com/photos/2.jpg",
  },
  {
    id: 3,
    timestamp: "2023-05-09T08:32:22",
    studentName: null,
    studentId: null,
    status: "not_found",
    accuracy: null,
    photoUrl: "https://example.com/photos/3.jpg",
  },
  {
    id: 4,
    timestamp: "2023-05-08T14:15:30",
    studentName: "Ahmad Farhan",
    studentId: "190043456",
    status: "match",
    accuracy: "95%",
    photoUrl: "https://example.com/photos/4.jpg",
  },
  {
    id: 5,
    timestamp: "2023-05-08T10:22:18",
    studentName: "Siti Aminah",
    studentId: "190044567",
    status: "match",
    accuracy: "97%",
    photoUrl: "https://example.com/photos/5.jpg",
  },
  {
    id: 6,
    timestamp: "2023-05-08T09:37:45",
    studentName: null,
    studentId: null,
    status: "not_found",
    accuracy: null,
    photoUrl: "https://example.com/photos/6.jpg",
  },
  {
    id: 7,
    timestamp: "2023-05-07T15:12:33",
    studentName: "Deni Pratama",
    studentId: "190045678",
    status: "match",
    accuracy: "93%",
    photoUrl: "https://example.com/photos/7.jpg",
  },
  {
    id: 8,
    timestamp: "2023-05-07T11:08:19",
    studentName: "Rina Wati",
    studentId: "190042345",
    status: "match",
    accuracy: "94%",
    photoUrl: "https://example.com/photos/8.jpg",
  },
];

interface FilterState {
  search: string;
  date: Date | undefined;
  status: string;
}

const HistoryPage = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    date: undefined,
    status: "all",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "timestamp",
    direction: "desc" as "asc" | "desc",
  });

  // Apply filters and sorting to history data
  const filteredHistory = historyData
    .filter((entry) => {
      // Apply search filter (on name or ID)
      const searchLower = filters.search.toLowerCase();
      const nameMatch = entry.studentName
        ? entry.studentName.toLowerCase().includes(searchLower)
        : false;
      const idMatch = entry.studentId
        ? entry.studentId.toLowerCase().includes(searchLower)
        : false;
      const searchMatches = !filters.search || nameMatch || idMatch;

      // Apply date filter
      const dateMatches = !filters.date || 
        entry.timestamp.startsWith(format(filters.date, "yyyy-MM-dd"));

      // Apply status filter
      const statusMatches = 
        filters.status === "all" || entry.status === filters.status;

      return searchMatches && dateMatches && statusMatches;
    })
    .sort((a, b) => {
      if (sortConfig.key === "timestamp") {
        return sortConfig.direction === "asc"
          ? a.timestamp.localeCompare(b.timestamp)
          : b.timestamp.localeCompare(a.timestamp);
      }
      return 0;
    });

  // Handle date filter change
  const handleDateChange = (date: Date | undefined) => {
    setFilters({ ...filters, date });
  };

  // Handle sort change
  const handleSort = () => {
    setSortConfig({
      key: "timestamp",
      direction: sortConfig.direction === "asc" ? "desc" : "asc",
    });
  };

  // Format display date
  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, "dd MMMM yyyy, HH:mm", { locale: id });
  };

  // Handle download report
  const handleDownloadReport = () => {
    alert("Downloading report (this would generate a CSV or PDF in a real app)");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Riwayat Deteksi</h1>
          <p className="text-muted-foreground">
            Log aktivitas deteksi wajah dalam sistem
          </p>
        </div>
        <Button onClick={handleDownloadReport}>
          <Download className="mr-2 h-4 w-4" /> Unduh Laporan
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Filter & Pencarian</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="search">Cari Mahasiswa</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Nama atau NIM..."
                  className="pl-8"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>
            </div>

            {/* Date filter */}
            <div className="space-y-2">
              <Label>Tanggal</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.date ? (
                      format(filters.date, "dd MMMM yyyy", { locale: id })
                    ) : (
                      <span>Pilih tanggal</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.date}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                  {filters.date && (
                    <div className="border-t p-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDateChange(undefined)}
                      >
                        Reset
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>

            {/* Status filter */}
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={filters.status}
                onValueChange={(value) => setFilters({ ...filters, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Semua status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="match">Terdeteksi</SelectItem>
                  <SelectItem value="not_found">Tidak Ditemukan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort button */}
            <div className="space-y-2">
              <Label>Pengurutan</Label>
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={handleSort}
              >
                <span>Urutkan berdasarkan waktu</span>
                {sortConfig.direction === "desc" ? (
                  <ArrowDown className="h-4 w-4" />
                ) : (
                  <ArrowUp className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History table */}
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-4 py-3.5 text-left text-sm font-semibold">
                  Waktu
                </th>
                <th className="px-4 py-3.5 text-left text-sm font-semibold">
                  Mahasiswa
                </th>
                <th className="px-4 py-3.5 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="px-4 py-3.5 text-left text-sm font-semibold">
                  Akurasi
                </th>
                <th className="px-4 py-3.5 text-left text-sm font-semibold">
                  Foto
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredHistory.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-4 py-3 text-sm">
                    {formatDisplayDate(entry.timestamp)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {entry.studentName ? (
                      <div>
                        <div className="font-medium">{entry.studentName}</div>
                        <div className="text-muted-foreground">
                          {entry.studentId}
                        </div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center">
                      {entry.status === "match" ? (
                        <>
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                          <span>Terdeteksi</span>
                        </>
                      ) : (
                        <>
                          <div className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                          <span>Tidak Ditemukan</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {entry.accuracy || "-"}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Button variant="ghost" size="sm">
                      <span className="text-xs underline text-blue-500">
                        Lihat Foto
                      </span>
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredHistory.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    Tidak ada data riwayat yang ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Deteksi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{historyData.length}</div>
            <p className="text-xs text-muted-foreground">
              Total aktivitas deteksi dalam sistem
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CheckCheck className="h-4 w-4 text-green-500" />
              <CardTitle className="text-sm font-medium">Terdeteksi</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {historyData.filter(entry => entry.status === "match").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Jumlah wajah yang berhasil dideteksi
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <X className="h-4 w-4 text-red-500" />
              <CardTitle className="text-sm font-medium">Tidak Ditemukan</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {historyData.filter(entry => entry.status === "not_found").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Jumlah deteksi yang tidak menemukan kecocokan
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HistoryPage;
