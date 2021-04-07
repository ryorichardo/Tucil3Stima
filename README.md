# A-Star Route
Tugas Kecil IF2211 Strategi Algoritma<br>
Program Studi Teknik Informatika<br>
Institut Teknologi Bandung<br>
2021

## Description
Sesuai namanya, program A-Star Route adalah program untuk menentukan rute perjalanan dengan memanfaatkan algoritma A Star. Program ini dapat menampilkan rute terdekat antara 2 titik yang dipilih dari peta dengan algoritma A Star.

## Algoritma A Star
Algoritma A Star adalah modifikasi dari algoritma Breadth First Search (BFS). Dengan algoritma A Star, kita dapat menetukan jarak terpendek untuk simpul-simpul yang memiliki bobot tertentu. Sama seperti BFS, algoritma A Star juga memanfaatkan Queue untuk melakukan pengurutan simpul yang dapat diambil, namun terletak perbedaan dimana algoritma A Star memanfaatkan Priority Queue dengan bobot simpul terkecil yang diprioritaskan terlebih dahulu. Untuk menghitung bobot tiap simpul, biasanya algoritma A Star memanfaatkan fungsi heuristik yang memiliki formula `f(n) = g(n) + h(n)`, dimana `g(n)` adalah bobot dari simpul akar ke simpul yang sedang diperiksa, dan `h(n)` adalah estimasi bobot dari simpul yang diperiksa ke simpul tujuan.

## Requirements
Pastikan sudah memiliki `npm` yang terintergrasi dengan terminal anda. Kemudian, navigasi ke direktori tempat Anda menaruh repositori ini. Lalu, lakukan `npm install react` untuk melakukan instalasi framework react.js yang dibutuhkan untuk menjalankan program ini.

## How to use
Untuk menjalankan program ini, ikuti langkah-langkah berikut:
* Ketik `npm start` di terminal anda. 
* Jika program belum berhasil berjalan, lakukan `npm install all dependencies` untuk melengkapi library yang dibutuhkan.
* Masukkan file berekstensi `.json` ke dalam program sesuai yang diminta input. Contoh format file JSON dapat dilihat di salah satu file pada direktori `test`. 
* Keterangan format file: setiap file memiliki atribut `nodes` yang merupakan array yang tiap elemennya memiliki atribut `id`, `name`, dan `coordinates`. Kemudian, file juga memiliki atribut `adjacency matriks` yang menunjukkan keterhubungan setiap simpul pada peta sesuai id simpul masing-masing.
* Pilih titik mulai dan titik tujuan pada peta, dan rute akan langsung terbentuk. Jika ingin memilih titik lain, gunakan button `Reset Nodes`.

## Hal-hal PENTING!
1. Jika format file JSON yang dimasukkan salah, maka program tidak akan menampilkan map.
2. Jika 2 nodes yang diklik tidak memiliki keterhubungan, maka program tidak akan menampilkan rute. Jika ingin melakukan *reroute* maka klik tombol **Reset Node**.
3. Rute yang didukung hanyalah di antara dua node.

## Author
Program ini dibuat oleh:
* Ryo Richardo - 13519193
* Andres Jerriel Sinabutar - 13519218
