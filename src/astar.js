class Element { 
    constructor(index, list, wV, w) {
        this.idx = index;       // index node
        this.visited = list;    // node yang sudah dikunjungi
        this.weightVisited = wV;// bobot jarak yg sudah dilewati (sama seperti g(n))
        this.weight = w;        // bobot node (sama seperti g(n) + h(n))
    }
  
    setIdx(index) {
        this.idx = index;
    }
  
    getIdx() {
        return this.idx;
    }
  
    addNode(index) {
        this.visited.push(index);
    }
  
    getVisited() {
        return this.visited;
    }
  
    getWeightVisited() {
        return this.weightVisited;
    }
  
    getWeight() {
        return this.weight;
    }
  }
class PriorityQueue {
    constructor() {
        this.list = [];         // isi queue
        this.hasVisited = [];   // isi node2 yang sudah dikunjungi (unik)
    }
    
    isEmpty() {
        return (this.list.length === 0); 
    }
    
    enqueue(element) {
        // Kosong
        if (this.isEmpty()) {
            this.list.push(element);
            this.hasVisited.push(element.getIdx());
        }

        // Element belum ada di hasVisited; element baru dikunjungi
        // const id = (el) => el === element.getIdx();
        if (!this.hasVisited.includes(element.getIdx())){
            let i = 0;
            let pushed = false;
            while (i < this.list.length && !pushed) {
              if (this.list[i].getWeight() > element.getWeight()) {
                this.list.splice(i, 0, element);
                pushed = true;
              }
              i++;
            }
            // Element baru paling besar; i mencapai max
            if (!pushed) {
              this.list.push(element);
            }
            
            // Tambah hasVisited
            this.hasVisited.push(element.getIdx());
        }
      
        
    }
  
    dequeue() {
        if (!this.isEmpty()) {
            return this.list.shift();
        }
    }
  
    peek() {
        if (!this.isEmpty()) {
            return this.list[0];
        }
    }
}


function haversineDistance(long1, lat1, long2, lat2) {
    // Diambil dari https://www.movable-type.co.uk/scripts/latlong.html
    const r = 6371000 // radius bumi 6317000 m
    const sigma1 = lat1 * Math.PI/180;
    const sigma2 = lat2 * Math.PI/180;
    const deltasigma = (lat2 - lat1) * Math.PI/180;
    const deltalambda = (long2 - long1) * Math.PI/180

    const a = Math.sin(deltasigma/2) * Math.sin(deltasigma/2) + Math.cos(sigma1) * Math.cos(sigma2) * Math.sin(deltalambda/2) * Math.sin(deltalambda/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return r * c;
}


// Algoritma A*

// Inisialisasi elemen pertama dan queue
export default function aStar(idxsrc, idxdes, matrix, coor) {
    // Kamus
    // idxsrc   : indeks start node
    // idxdes   : indeks destination node
    // matrix   : adjacency matrix
    // long     : list of longitudes
    // lat      : list of lattitudes

    let el = new Element(idxsrc, [], 0, 0);
    let queue = new PriorityQueue();
    queue.enqueue(el);

    // Pengulangan sampai top of queue adalah node tujuan atau queue kosong
    while (el.getIdx() !== idxdes && !queue.isEmpty()) {
        el = queue.dequeue();
        el.addNode(el.getIdx());
    
        // Mencari adjacency di matrix
        for (let kolom = 0; kolom < matrix[el.getIdx()].length; kolom++) {
            if (matrix[el.getIdx()][kolom] === 1 && !queue.hasVisited.includes(kolom)) {
                let distanceElNextEl = haversineDistance(coor[el.getIdx()][0], coor[el.getIdx()][1], coor[kolom][0], coor[kolom][1]); // hitung jarak pindah elemen
                let heuristicDistance = haversineDistance(coor[idxdes][0], coor[idxdes][1], coor[kolom][0], coor[kolom][1]); // hitung jarak heuristik nextEl ke tujuan
                let newWeightVisited = el.getWeightVisited() + distanceElNextEl; // jarak baru (g(n))
                let newWeight = newWeightVisited + heuristicDistance; // bobot baru (g(n) + h(n))
                queue.enqueue(new Element(kolom, el.getVisited(), newWeightVisited, newWeight)); // enqueue
            }
        }
        // Next element
        if (!queue.isEmpty()) {
            el = queue.peek();
        }
    }
  
    // Isi el.visited dengan diri sendiri
    el.addNode(el.getIdx());

    // Kondisi ketemu
    if (el.getIdx() === idxdes) {
        let res = [];       
        el.visited.forEach(element => {
            res.push(coor[element]);
        })
        return res;
    }
  
    // Kondisi gaketemu array kosong
    else {
        return [];
    }
}
