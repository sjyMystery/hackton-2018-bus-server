#include <cmath>
#include <ctime>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <iostream>
#include <fstream>
#include <algorithm>
#define double long double
typedef long long ll ;
#define rep(i, a, b) for (int i = a; i <= b; ++ i)
const int N = 5050, M = 3e7 + 5 ;
const double inf = 1e17 ;
const int RandBase = 9971, RandMo = 1e9 + 7 ;
//
const double MaxDist = 0.027084599965936 ;
// k
//
using namespace std ;

struct poi {
    double x, y ;
    int id, d ;
    poi() {}
    poi(double _x, double _y) {
        x = _x ;
        y = _y ;
    }
} a[N], b[N] ;
int n, G[N][N], e, ter[M], nxt[M], lnk[N], B[N], P[N], Ans[N], ans ;
bool vis[N] ;

//
double sqr(double x) {
    return x * x ;
}

double GetDist(poi a, poi b) {
    return sqrt(sqr(a.x - b.x) + sqr(a.y - b.y)) ;
}

//


inline int Rand() {
    int res = 0 ;
    rep(i, 1, 20) {
        res = ((ll) res * RandBase + rand()) % RandMo + 1 ;
    }
    return res ;
}

void Init(const char * filename) {
    freopen(filename, "r", stdin) ;
    scanf("%d", &n) ;
    rep(i, 1, n) {
        scanf("%Lf%Lf", &a[i].x, &a[i].y) ;
    }
    rep(i, 1, n) rep(j, 1, n) {
        scanf("%d", &G[i][j]) ;
    }
    // printf("%.15Lf\n", 3.0 / 6.801 * GetDist(a[1], a[2])) ;
}

void Add(int x, int y) {
    ter[++ e] = y ;
    nxt[e] = lnk[x] ;
    lnk[x] = e ;
}

void Pre(int s) {
    rep(i, 1, n) lnk[i] = 0 ;
    rep(i, 1, e) nxt[i] = 0 ;
    e = 0 ;
    rep(i, 1, n) rep(j, 1, n) {
        if (i == j) continue ;
        if (GetDist(a[i], a[j]) > MaxDist) continue ;
        if (GetDist(a[i], a[s]) >= GetDist(a[j], a[s])) continue ;
        Add(i, j) ;
    }
}

void Upd() {
    int tmp = 0 ;
    rep(i, 1, B[0]) rep(j, i + 1, B[0]) {
        tmp += G[B[i]][B[j]] ;
    }
    if (tmp > ans) {
        ans = tmp ;
        rep(i, 0, B[0]) {
            Ans[i] = B[i] ;
        }
    }
}

void Run(int s) {
    Pre(s) ;
    rep(L, 1, 1000) { // 1000
        B[0] = 1 ;
        B[1] = s ;
        for ( ; ; ) {
            int u = B[B[0]] ;
            int Sum = 0 ;
            for (int i = lnk[u] ; i; i = nxt[i]) {
                int v = ter[i] ;
                double Mn = inf, o = GetDist(a[v], a[u]) ;
                vis[v] = true ;
                rep(j, 1, B[0] - 1) if (GetDist(a[B[j]], a[v]) <= o) {
                    vis[v] = false ;
                    break ;
                }
                if (!vis[v]) {
                    continue ;
                }
                int res = 0 ;
                rep(j, 1, B[0]) {
                    res += G[B[j]][v] ;
                }
                Sum += res ;
                P[v] = res ;
            }
            if (!Sum) break ;
            int x = Rand() % Sum + 1 ;
            for (int i = lnk[u] ; i ; i = nxt[i]) {
                int v = ter[i] ;
                if (!vis[v]) continue ;
                if (x <= P[v]) {
                    B[++ B[0]] = v ;
                    break ;
                }
                x -= P[v] ;
            }
        }
        Upd() ;
    }
}

void Solve() {
    // 找k个起点
    rep(i, 1, n) {
        a[i].id = i ;
    }
    int k = 100 ;
    rep(i, 1, n) {
        a[i].d = 0 ;
        rep(j, 1, n) {
            a[i].d += G[i][j] ;
        }
    }
    rep(i, 1, n) {
        b[i] = a[i] ;
    }
    int Sum = 0 ;
    rep(i, 1, n) {
        Sum += b[i].d ;
    }
    rep(t, 1, k) {
        if (!Sum) break ;
        int x = Rand() % Sum + 1 ;
        rep(i, 1, n) {
            if (x <= b[i].d) {
                Run(b[i].id) ;
                Sum -= b[i].d ;
                rep(j, i + 1, n) {
                    b[j - 1] = b[j] ;
                }
                break ;
            }
            x -= b[i].d ;
        }
    }
}

void Print(const char * outputfile) {
    /*int Sum = 0 ;
    rep(i, 1, n) rep(j, 1, n) {
        Sum += G[i][j] ;
    }
    cout << Sum << endl ; */
    FILE* fp= fopen(outputfile,"w");
    if(fp)
        fclose(fp);

    fstream fs;
    fs.open(outputfile,fstream::out|fstream::app);
    fs.precision(16);
    rep(i, 1, Ans[0]) {
        fs<< a[Ans[i]].x << "," << a[Ans[i]].y <<endl;
    }
    /*rep(i, 1, Ans[0] - 1) {
        printf("%.15Lf\n", GetDist(a[Ans[i]], a[Ans[i + 1]]) * 6.801 / GetDist(a[1], a[2])) ;
    }*/
    // cout << endl << ans << endl ;
    fs.close();
}

int main(int argc,char* argv[]) {
    srand(time(NULL));

    Init(argv[1]);
    Solve() ;
    Print(argv[2]) ;
    return 0 ;
}
