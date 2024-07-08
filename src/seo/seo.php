<?php

function dd($value)
{
    echo "<pre>";
    print_r($value);
    echo "</pre>";
}

class SeoManager
{

    protected $page;
    private static $instance;
    protected $url;

    public function __construct()
    {
        $this->url = str_replace('/', '', $_SERVER['REQUEST_URI']);
    }

    public static function create()
    {
        if (!self::$instance) {
            self::$instance = new SeoManager();
        }

        self::$instance->pageFactory();
    }

    public static function meta()
    {
        if (!self::$instance) {
            self::$instance = new SeoManager();
        }

        self::$instance->pageHeader();
    }

    public function getMetaTags($title, $desc)
    {
        return '<meta name="title" content="' . $title . '" /><meta name="description" content="' . $desc . '" /><title>' . $title . '</title>';
    }

    public function getBodyTags($title, $desc)
    {
        return '<h1>' . $title . '</h1><p>' . $desc . '</p>';
    }

    public function pageHeader()
    {
        $title = "رقم - اكبر دليل أطباء في العراق";
        $desc = "ابحث عن أفضل أطباء في العراق | الموصل | البصرة | بغداد | كركوك . قائمة شاملة للأطباء النخبة والعيادات المتخصصة والمراكز والمختبرات الطبية والصيدليات";
        $data = $this->getMetaTags($title, $desc);

        Route::get('/', function ($params) use ($data) {
            echo $data;
        });
        Route::get('/home', function ($params) use ($data) {
            echo $data;
        });
        Route::get('/search', function ($params) use ($data) {
            echo $data;
        });
        Route::get('/about', function ($params) use ($data) {
            echo $data;
        });
        Route::get('/contact', function ($params) use ($data) {
            echo $data;
        });
        Route::get('/blog', function ($params) use ($data) {
            echo $data;
        });
        Route::get('/v/{slug}', function ($params) use ($data, $title, $desc) {
            try {
                $slug = urldecode($params['slug'] ?? '');
                $res = Util::httpPost('https://backend.raqm.online/api/clinics', ['slug' => $slug]);
                $res = json_decode($res, true);
                $res = $res['data'][0];
                $title = $res['title'] ?? $title;
                $description = $res['description'] ?? $desc;
                $data = $this->getMetaTags($title, $description);
                echo $data;
            } catch (\Exception $th) {
                echo $data;
            }
        });
        Route::get('/blog/{slug}', function ($params) use ($data, $title, $desc) {
            try {
                $slug = urldecode($params['slug'] ?? '');
                $res = Util::httpPost('https://backend.raqm.online/api/blogs/' . $slug, []);
                $res = json_decode($res, true);

                $title = $res['title_ar'] ?? $title;
                $description = $res['description_ar'] ?? $desc;
                $data = $this->getMetaTags($title, $description);
                echo $data;
            } catch (\Exception $th) {
                echo $data;
            }
        });
    }

    public function pageFactory()
    {
        $title = "رقم - اكبر دليل أطباء في العراق";
        $desc = "ابحث عن أفضل أطباء في العراق | الموصل | البصرة | بغداد | كركوك . قائمة شاملة للأطباء النخبة والعيادات المتخصصة والمراكز والمختبرات الطبية والصيدليات";
        $data = $this->getBodyTags($title, $desc);

        Route::get('/', function ($params) use ($data) {
            echo $data;
        });
        Route::get('/home', function ($params) use ($data) {
            echo $data;
        });
        Route::get('/search', function ($params) use ($data) {
            echo $data;
        });
        Route::get('/about', function ($params) use ($data) {
            echo $data;
        });
        Route::get('/contact', function ($params) use ($data) {
            echo $data;
        });
        Route::get('/blog', function ($params) use ($data) {
            echo $data;
        });
        Route::get('/v/{slug}', function ($params) use ($data, $title, $desc) {
            try {
                $slug = urldecode($params['slug'] ?? '');
                $res = Util::httpPost('https://backend.raqm.online/api/clinics', ['slug' => $slug]);
                $res = json_decode($res, true);
                $res = $res['data'][0];
                $title = $res['title'] ?? $title;
                $description = $res['description'] ?? $desc;
                $data = $this->getBodyTags($title, $description);
                echo $data;
            } catch (\Exception $th) {
                echo $data;
            }
        });
        Route::get('/blog/{slug}', function ($params) use ($data, $title, $desc) {
            try {
                $slug = urldecode($params['slug'] ?? '');
                $res = Util::httpPost('https://backend.raqm.online/api/blogs/' . $slug, []);
                $res = json_decode($res, true);

                $title = $res['title_ar'] ?? $title;
                $description = $res['description_ar'] ?? $desc;
                $data = $this->getBodyTags($title, $description);
                echo $data;
            } catch (\Exception $th) {
                echo $data;
            }
        });

    }

}

class Util
{

    public static function httpPost($url, $data)
    {
        $payload = json_encode($data);
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLINFO_HEADER_OUT, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type:application/json',
        ));
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Raqm');
        $result = curl_exec($ch);
        curl_close($ch);

        return $result;
    }

    public static function getRequestUrl()
    {
        $prefix = "/clinic";
        return str_replace($prefix, '', $_SERVER['REQUEST_URI']);
    }
}

interface SeoPage
{

    public function get();
}

class HomeSeo implements SeoPage
{

    public function get()
    {
        return "<h1>Raqm Online</h1><p>أفضل محرك بحث لجهات الاتصال</p>";
    }

}

class Route
{

    public function hasParam($url)
    {
        return str_contains($url, '{');
    }

    public function getParams($url)
    {
        $arr1 = explode('/', $url);
        $arr2 = explode('/', Util::getRequestUrl());

        $params = [];
        for ($i = 0; $i < count($arr1); $i++) {
            $path1 = $arr1[$i] ?? null;
            $path2 = $arr2[$i] ?? null;
            $var = str_replace(['{', '}'], ['', ''], $path1);
            if ($path1 != $path2 && str_contains($path1, '{')) {
                if ($path2) {
                    $params[$var] = $path2;
                }
            }
        }
        return $params;
    }

    public function replaceParams($url)
    {
        $params = $this->getParams($url);
        foreach ($params as $key => $value) {
            $url = str_replace('{' . $key . '}', $value, $url);
        }
        return $url;
    }

    public static function get($url, $callback)
    {
        $instance = new Route();
        $requestUrl = Util::getRequestUrl();
        $convertedUrl = $url;
        $params = [];

        if ($instance->hasParam($url)) {
            $params = $instance->getParams($url);
            $convertedUrl = $instance->replaceParams($url);
        }

        if ($convertedUrl == $requestUrl) {
            $callback($params);
        }
    }
}
